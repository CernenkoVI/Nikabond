from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny

from .models import Session
from .serializers import SessionsListSerializer, SessionDetailSerializer
from .forms import SessionForm


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

        return JsonResponse({'success': True})
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
