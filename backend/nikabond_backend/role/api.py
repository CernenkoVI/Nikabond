from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Role
from .serializers import RolesListSerializer, RoleDetailSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def roles_list(request):
    roles = Role.objects.all()
    serializer = RolesListSerializer(roles, many=True)

    return JsonResponse({
        'data': serializer.data
    })


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def role_detail(request, pk):
    role = Role.objects.get(pk=pk)

    serializer = RoleDetailSerializer(role, many=False)
    return JsonResponse(serializer.data)
