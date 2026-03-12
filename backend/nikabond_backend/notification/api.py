from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny

from .models import Notification
from .serializers import NotificationSerializer
from .forms import NotificationForm


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def notifications_list(request):
    project_id = request.query_params.get('project')
    if project_id:
        notifications = Notification.objects.filter(project_id=project_id)
    else:
        notifications = Notification.objects.all()
    serializer = NotificationSerializer(notifications, many=True)

    return JsonResponse({
        'data': serializer.data
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def create_notification(request):
    form = NotificationForm(request.POST)

    if form.is_valid():
        form.save()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'errors': form.errors.as_json()}, status=400)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_notification(request, pk):
    notification = get_object_or_404(Notification, pk=pk)
    notification.delete()
    return JsonResponse({'success': True})
