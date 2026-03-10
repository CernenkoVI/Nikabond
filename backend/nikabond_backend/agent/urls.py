from django.urls import path, include

from . import api


urlpatterns = [
    path('', api.agents_list, name='api_agents_list'),
    path("accounts/", include("allauth.urls")),
    path("create/", api.create_agent, name='api_create_agent'),
    path('<uuid:pk>/update/', api.update_agent, name='api_update_agent'),
    path('<uuid:pk>/', api.agents_detail, name='api_agents_detail'),
]