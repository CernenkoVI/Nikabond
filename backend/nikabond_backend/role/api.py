import json

from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny

from .models import Role, RoleActor
from .serializers import RolesListSerializer, RoleDetailSerializer, RoleActorSerializer
from .forms import RoleForm

from actor.models import Actor


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def roles_list(request):
    project_id = request.query_params.get('project')
    if project_id:
        roles = Role.objects.filter(project_id=project_id)
    else:
        roles = Role.objects.all()
    serializer = RolesListSerializer(roles, many=True)

    return JsonResponse({
        'data': serializer.data
    })


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def role_detail(request, pk):
    role = get_object_or_404(Role, pk=pk)

    serializer = RoleDetailSerializer(role, many=False)
    return JsonResponse(serializer.data)


# Legacy endpoint — kept for backwards compatibility
@api_view(['POST'])
@permission_classes([AllowAny])
def update_role_actors(request, pk):
    role = get_object_or_404(Role, pk=pk)
    actor_ids = request.POST.getlist('actors')
    role.actors.set(actor_ids)

    # Also sync to RoleActor table
    existing = set(RoleActor.objects.filter(role=role).values_list('actor_id', flat=True))
    new_ids = set(actor_ids)
    # Add new entries
    for actor_id in new_ids - existing:
        RoleActor.objects.get_or_create(role=role, actor_id=actor_id)
    # Remove entries no longer in the set
    RoleActor.objects.filter(role=role).exclude(actor_id__in=new_ids).delete()

    return JsonResponse({'success': True})


@api_view(['POST'])
@permission_classes([AllowAny])
def create_role(request):
    form = RoleForm(request.POST, request.FILES)

    if form.is_valid():
        role = form.save(commit=False)
        role.save()
        form.save_m2m()

        return JsonResponse({'success': True, 'id': str(role.id)})
    else:
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def update_role(request, pk):
    role = get_object_or_404(Role, pk=pk)
    form = RoleForm(request.POST, request.FILES, instance=role)

    if form.is_valid():
        role = form.save(commit=False)
        role.save()
        form.save_m2m()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'errors': form.errors.as_json()}, status=400)


# --- Shortlist endpoints ---

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def shortlist_list(request, pk):
    """List all actors on a role's shortlist."""
    role = get_object_or_404(Role, pk=pk)
    status_filter = request.query_params.get('status')

    role_actors = RoleActor.objects.filter(role=role).select_related('actor')
    if status_filter:
        role_actors = role_actors.filter(status=status_filter)

    serializer = RoleActorSerializer(role_actors, many=True)
    return JsonResponse({'data': serializer.data})


@api_view(['POST'])
@permission_classes([AllowAny])
def shortlist_add(request, pk):
    """Add actors to a role's shortlist."""
    role = get_object_or_404(Role, pk=pk)

    # Accept JSON body or form data
    if request.content_type and 'application/json' in request.content_type:
        data = json.loads(request.body)
    else:
        data = request.data

    actor_ids = data.get('actor_ids', [])
    status = data.get('status', 'shortlisted')

    if not actor_ids:
        return JsonResponse({'error': 'actor_ids is required'}, status=400)

    valid_statuses = [c[0] for c in RoleActor.STATUS_CHOICES]
    if status not in valid_statuses:
        return JsonResponse({'error': f'Invalid status. Must be one of: {valid_statuses}'}, status=400)

    created = []
    for actor_id in actor_ids:
        actor = Actor.objects.filter(pk=actor_id).first()
        if not actor:
            continue
        ra, was_created = RoleActor.objects.get_or_create(
            role=role,
            actor=actor,
            defaults={'status': status},
        )
        if was_created:
            # Also sync to legacy M2M
            role.actors.add(actor)
            created.append(ra)

    serializer = RoleActorSerializer(created, many=True)
    return JsonResponse({'success': True, 'added': len(created), 'role_actors': serializer.data})


@api_view(['PATCH'])
@permission_classes([AllowAny])
def shortlist_update(request, pk, actor_pk):
    """Update an actor's status/notes on a role's shortlist."""
    role_actor = get_object_or_404(RoleActor, role_id=pk, actor_id=actor_pk)

    if request.content_type and 'application/json' in request.content_type:
        data = json.loads(request.body)
    else:
        data = request.data

    if 'status' in data:
        valid_statuses = [c[0] for c in RoleActor.STATUS_CHOICES]
        if data['status'] not in valid_statuses:
            return JsonResponse({'error': f'Invalid status. Must be one of: {valid_statuses}'}, status=400)
        role_actor.status = data['status']

    if 'notes' in data:
        role_actor.notes = data['notes']

    role_actor.save()

    serializer = RoleActorSerializer(role_actor)
    return JsonResponse(serializer.data)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def shortlist_remove(request, pk, actor_pk):
    """Remove an actor from a role's shortlist (also removes from sessions for this role)."""
    role_actor = get_object_or_404(RoleActor, role_id=pk, actor_id=actor_pk)

    # Remove from all sessions for this role
    from session.models import SessionActor
    SessionActor.objects.filter(role_id=pk, actor_id=actor_pk).delete()

    # Remove from legacy M2M
    role = role_actor.role
    role.actors.remove(role_actor.actor)

    role_actor.delete()
    return JsonResponse({'success': True})


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def role_pipeline(request, pk):
    """Get actors for a role derived from session participation.

    Returns actors who have been confirmed/completed in any session,
    plus all actors with any session participation if ?all=true.
    """
    role = get_object_or_404(Role, pk=pk)

    from session.models import SessionActor

    show_all = request.query_params.get('all', '').lower() == 'true'

    session_actors = SessionActor.objects.filter(role=role).select_related('actor', 'session')

    # Group by actor
    actor_map = {}
    for sa in session_actors:
        actor_id = str(sa.actor_id)
        if actor_id not in actor_map:
            actor_map[actor_id] = {
                'actor': {
                    'id': actor_id,
                    'name': sa.actor.name,
                    'image_url': sa.actor.image_url(),
                },
                'sessions': [],
                'has_confirmed': False,
            }
        actor_map[actor_id]['sessions'].append({
            'session_id': str(sa.session_id),
            'session_title': sa.session.title,
            'outcome': sa.outcome,
            'time_slot': sa.time_slot.isoformat() if sa.time_slot else None,
        })
        if sa.outcome in ('confirmed', 'completed'):
            actor_map[actor_id]['has_confirmed'] = True

    if not show_all:
        # Only return actors with at least one confirmed/completed outcome
        actor_map = {k: v for k, v in actor_map.items() if v['has_confirmed']}

    result = list(actor_map.values())
    return JsonResponse({'role_id': str(role.id), 'actors': result})
