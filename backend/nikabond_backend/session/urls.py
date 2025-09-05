from django.urls import path, include
from . import api

urlpatterns = [
    path('', api.sessions_list, name='api_sessions_list'),
    path("accounts/", include("allauth.urls")),
    path('<uuid:pk>/', api.session_detail, name='api_session_detail'),
]