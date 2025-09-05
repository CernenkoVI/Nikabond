from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Project
from .serializers import ProjectsListSerializer, ProjectDetailSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def projects_list(request):
    projects = Project.objects.all()
    serializer = ProjectsListSerializer(projects, many=True)

    return JsonResponse({
        'data': serializer.data
    })


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def project_detail(request, pk):
    project = Project.objects.get(pk=pk)

    serializer = ProjectDetailSerializer(project, many=False)
    return JsonResponse(serializer.data)
