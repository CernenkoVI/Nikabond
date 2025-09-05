from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Session
from .serializers import SessionsListSerializer, SessionDetailSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def sessions_list(request):
    sessions = Session.objects.all()
    serializer = SessionsListSerializer(sessions, many=True)

    return JsonResponse({
        'data': serializer.data
    })


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def session_detail(request, pk):
    session = Session.objects.get(pk=pk)

    serializer = SessionDetailSerializer(session, many=False)
    return JsonResponse(serializer.data)
