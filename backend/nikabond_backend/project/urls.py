from django.urls import path, include
from . import api

urlpatterns = [
    path('', api.projects_list, name='api_projects_list'),
    path("accounts/", include("allauth.urls")),
    path('<uuid:pk>/update/', api.update_project, name='api_update_project'),
    path('<uuid:pk>/', api.project_detail, name='api_project_detail'),
    path('create/', api.create_project, name='api_create_project'),
]