from django.urls import path
from . import api

urlpatterns = [
    path('', api.roles_list, name='api_roles_list'),
    path('create/', api.create_role, name='api_create_role'),
    path('<uuid:pk>/update/', api.update_role, name='api_update_role'),
    path('<uuid:pk>/', api.role_detail, name='api_role_detail'),
    path('<uuid:pk>/actors/', api.update_role_actors, name='api_update_role_actors'),
]