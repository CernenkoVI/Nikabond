from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny

from .models import Project
from .serializers import ProjectsListSerializer, ProjectDetailSerializer
from .forms import ProjectForm

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


@api_view(['POST'])
@permission_classes([AllowAny])
def create_project(request):
    form = ProjectForm(request.POST, request.FILES)

    if form.is_valid():
        project = form.save(commit=False)
        project.save()

        return JsonResponse({'success': True})
    else:
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def update_project(request, pk):
    project = get_object_or_404(Project, pk=pk)
    form = ProjectForm(request.POST, request.FILES, instance=project)

    if form.is_valid():
        project = form.save(commit=False)
        project.save()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'errors': form.errors.as_json()}, status=400)
