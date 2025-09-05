from django.urls import path, include
from . import api

urlpatterns = [
    path('', api.projects_list, name='api_projects_list'),
    path("accounts/", include("allauth.urls")),
    path('<uuid:pk>/', api.project_detail, name='api_project_detail'),
]