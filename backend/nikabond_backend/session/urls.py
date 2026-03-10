from django.urls import path
from . import api

urlpatterns = [
    path('', api.sessions_list, name='api_sessions_list'),
    path('create/', api.create_session, name='api_create_session'),
    path('<uuid:pk>/update/', api.update_session, name='api_update_session'),
    path('<uuid:pk>/', api.session_detail, name='api_session_detail'),
]
