from django.urls import path
from . import api

urlpatterns = [
    path('', api.roles_list, name='api_roles_list'),
    path('create/', api.create_role, name='api_create_role'),
    path('<uuid:pk>/', api.role_detail, name='api_role_detail'),
]