from django.urls import path
from . import api

urlpatterns = [
    path('', api.notifications_list, name='api_notifications_list'),
    path('create/', api.create_notification, name='api_create_notification'),
    path('<uuid:pk>/delete/', api.delete_notification, name='api_delete_notification'),
]
