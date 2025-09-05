from django.urls import path, include

from . import api


urlpatterns = [
    path("accounts/", include("allauth.urls")),
    path('<uuid:pk>/', api.agents_detail, name='api_agents_detail'),
]