from django.urls import path, include
from . import api

urlpatterns = [
    path('', api.actors_list, name='api_actors_list'),
    path('create/', api.create_portfolio, name='api_create_portfolio'),
    path("accounts/", include("allauth.urls")),
    path('<uuid:pk>/update/', api.update_actor, name='api_update_actor'),
    path('<uuid:pk>/', api.actors_detail, name='api_actors_detail'),
]