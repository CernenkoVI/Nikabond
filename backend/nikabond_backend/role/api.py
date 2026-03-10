from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny

from .models import Role
from .serializers import RolesListSerializer, RoleDetailSerializer
from .forms import RoleForm

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


@api_view(['POST'])
@permission_classes([AllowAny])
def update_role_actors(request, pk):
    role = get_object_or_404(Role, pk=pk)
    actor_ids = request.POST.getlist('actors')
    role.actors.set(actor_ids)
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
