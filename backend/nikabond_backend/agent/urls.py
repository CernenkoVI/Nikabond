from django.urls import path, include

from . import api


urlpatterns = [
    path('', api.agents_list, name='api_agents_list'),
    path("accounts/", include("allauth.urls")),
    path('<uuid:pk>/', api.agents_detail, name='api_agents_detail'),
]