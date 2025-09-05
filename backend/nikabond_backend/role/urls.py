from django.urls import path, include
from . import api

urlpatterns = [
    path('', api.roles_list, name='api_roles_list'),
    path("accounts/", include("allauth.urls")),
    path('<uuid:pk>/', api.role_detail, name='api_role_detail'),
]