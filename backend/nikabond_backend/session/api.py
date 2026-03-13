import json

from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny

from .models import Session, SessionActor
from .serializers import SessionsListSerializer, SessionDetailSerializer, SessionActorSerializer
from .forms import SessionForm

from actor.models import Actor
from role.models import Role, RoleActor


CONFIRMED_OUTCOMES = ('confirmed', 'completed')


def _sync_role_actor(role, actor):
    """Auto-create or update RoleActor based on best session outcome for this role+actor."""
    best_outcomes = SessionActor.objects.filter(
        role=role, actor=actor
    ).values_list('outcome', flat=True)

    if any(o in CONFIRMED_OUTCOMES for o in best_outcomes):
        ra, created = RoleActor.objects.get_or_create(
            role=role, actor=actor,
            defaults={'status': 'callback'},
        )
        if not created and ra.status == 'shortlisted':
            ra.status = 'callback'
            ra.save(update_fields=['status'])
        # Also sync legacy M2M
        role.actors.add(actor)
    else:
        # No confirmed outcomes — remove RoleActor if it was auto-created
        # (Keep it if status was manually set to cast/passed/on_hold)
        RoleActor.objects.filter(
            role=role, actor=actor, status__in=('shortlisted', 'callback')
        ).delete()
        # Sync legacy M2M only if no RoleActor remains
        if not RoleActor.objects.filter(role=role, actor=actor).exists():
            role.actors.remove(actor)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def sessions_list(request):
    project_id = request.query_params.get('project')
    if project_id:
        sessions = Session.objects.filter(project_id=project_id)
    else:
        sessions = Session.objects.all()
    serializer = SessionsListSerializer(sessions, many=True)

    return JsonResponse({
        'data': serializer.data
    })


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def session_detail(request, pk):
    session = get_object_or_404(Session, pk=pk)

    serializer = SessionDetailSerializer(session, many=False)
    return JsonResponse(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def create_session(request):
    form = SessionForm(request.POST)

    if form.is_valid():
        session = form.save(commit=False)
        session.save()
        form.save_m2m()

        return JsonResponse({'success': True, 'id': str(session.id)})
    else:
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def update_session(request, pk):
    session = get_object_or_404(Session, pk=pk)
    form = SessionForm(request.POST, instance=session)

    if form.is_valid():
        session = form.save(commit=False)
        session.save()
        form.save_m2m()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'errors': form.errors.as_json()}, status=400)


# --- Session Actor endpoints ---

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def session_actors_list(request, pk):
    """List all actors in a session, optionally filtered by role or outcome."""
    session = get_object_or_404(Session, pk=pk)

    session_actors = SessionActor.objects.filter(session=session).select_related('actor', 'role')

    role_filter = request.query_params.get('role')
    if role_filter:
        session_actors = session_actors.filter(role_id=role_filter)

    outcome_filter = request.query_params.get('outcome')
    if outcome_filter:
        session_actors = session_actors.filter(outcome=outcome_filter)

    serializer = SessionActorSerializer(session_actors, many=True)
    return JsonResponse({'data': serializer.data})


@api_view(['POST'])
@permission_classes([AllowAny])
def session_actors_add(request, pk):
    """Add actors to a session for a specific role. Browses from all actors."""
    session = get_object_or_404(Session, pk=pk)

    if request.content_type and 'application/json' in request.content_type:
        data = json.loads(request.body)
    else:
        data = request.data

    actors_data = data.get('actors', [])
    if not actors_data:
        return JsonResponse({'error': 'actors is required (list of {actor_id, role_id})'}, status=400)

    session_role_ids = set(session.roles.values_list('id', flat=True))
    created = []
    errors = []

    for entry in actors_data:
        actor_id = entry.get('actor_id')
        role_id = entry.get('role_id')

        if not actor_id or not role_id:
            errors.append({'error': 'Each entry requires actor_id and role_id'})
            continue

        # Validate role is part of this session
        from uuid import UUID
        try:
            role_uuid = UUID(str(role_id))
        except ValueError:
            errors.append({'error': f'Invalid role_id: {role_id}'})
            continue

        if role_uuid not in session_role_ids:
            errors.append({'error': f'Role {role_id} is not part of this session'})
            continue

        actor = Actor.objects.filter(pk=actor_id).first()
        if not actor:
            errors.append({'error': f'Actor {actor_id} not found'})
            continue

        role = Role.objects.filter(pk=role_id).first()
        if not role:
            errors.append({'error': f'Role {role_id} not found'})
            continue

        sa, was_created = SessionActor.objects.get_or_create(
            session=session,
            actor=actor,
            role=role,
            defaults={'outcome': 'scheduled'},
        )
        if was_created:
            created.append(sa)

    serializer = SessionActorSerializer(created, many=True)
    response = {'success': True, 'added': len(created), 'session_actors': serializer.data}
    if errors:
        response['errors'] = errors
    return JsonResponse(response)


@api_view(['PATCH'])
@permission_classes([AllowAny])
def session_actor_update(request, pk, actor_pk):
    """Update outcome/notes for an actor in a session. Auto-syncs to RoleActor."""
    session = get_object_or_404(Session, pk=pk)

    if request.content_type and 'application/json' in request.content_type:
        data = json.loads(request.body)
    else:
        data = request.data

    role_id = data.get('role_id')
    if role_id:
        sa = get_object_or_404(SessionActor, session=session, actor_id=actor_pk, role_id=role_id)
    else:
        sa = get_object_or_404(SessionActor, session=session, actor_id=actor_pk)

    if 'outcome' in data:
        valid_outcomes = [c[0] for c in SessionActor.OUTCOME_CHOICES]
        if data['outcome'] not in valid_outcomes:
            return JsonResponse({'error': f'Invalid outcome. Must be one of: {valid_outcomes}'}, status=400)
        sa.outcome = data['outcome']

    if 'notes' in data:
        sa.notes = data['notes']

    if 'time_slot' in data:
        sa.time_slot = data['time_slot']

    sa.save()

    # Auto-sync: update RoleActor based on session outcomes
    _sync_role_actor(sa.role, sa.actor)

    serializer = SessionActorSerializer(sa)
    return JsonResponse(serializer.data)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def session_actor_remove(request, pk, actor_pk):
    """Remove an actor from a session. Auto-syncs RoleActor."""
    session = get_object_or_404(Session, pk=pk)

    role_id = request.query_params.get('role')
    if role_id:
        sa = get_object_or_404(SessionActor, session=session, actor_id=actor_pk, role_id=role_id)
    else:
        sa = get_object_or_404(SessionActor, session=session, actor_id=actor_pk)

    role = sa.role
    actor = sa.actor
    sa.delete()

    # Re-sync: actor may still be confirmed in other sessions
    _sync_role_actor(role, actor)

    return JsonResponse({'success': True})


@api_view(['POST'])
@permission_classes([AllowAny])
def session_move_actors(request):
    """Move actors from one session to another."""
    if request.content_type and 'application/json' in request.content_type:
        data = json.loads(request.body)
    else:
        data = request.data

    actor_ids = data.get('actor_ids', [])
    role_id = data.get('role_id')
    from_session_id = data.get('from_session_id')
    to_session_id = data.get('to_session_id')
    remove_from_source = data.get('remove_from_source', True)

    if not all([actor_ids, role_id, from_session_id, to_session_id]):
        return JsonResponse(
            {'error': 'actor_ids, role_id, from_session_id, and to_session_id are required'},
            status=400,
        )

    from_session = get_object_or_404(Session, pk=from_session_id)
    to_session = get_object_or_404(Session, pk=to_session_id)

    # Validate target session covers the role
    if not to_session.roles.filter(pk=role_id).exists():
        return JsonResponse({'error': 'Target session does not include this role'}, status=400)

    moved = 0
    for actor_id in actor_ids:
        # Create in target
        _, was_created = SessionActor.objects.get_or_create(
            session=to_session,
            actor_id=actor_id,
            role_id=role_id,
            defaults={'outcome': 'scheduled'},
        )
        if was_created:
            moved += 1

        # Optionally remove from source
        if remove_from_source:
            SessionActor.objects.filter(
                session=from_session,
                actor_id=actor_id,
                role_id=role_id,
            ).delete()

    return JsonResponse({'success': True, 'moved': moved})
