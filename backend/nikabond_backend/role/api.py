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
def create_role(request):
    form = RoleForm(request.POST, request.FILES)

    if form.is_valid():
        role = form.save(commit=False)
        role.save()

        return JsonResponse({'success': True})
    else:
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()}, status=400)
