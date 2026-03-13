from django.urls import path
from . import api

urlpatterns = [
    path('', api.sessions_list, name='api_sessions_list'),
    path('create/', api.create_session, name='api_create_session'),
    path('move-actors/', api.session_move_actors, name='api_session_move_actors'),
    path('<uuid:pk>/update/', api.update_session, name='api_update_session'),
    path('<uuid:pk>/', api.session_detail, name='api_session_detail'),
    # Session actor endpoints
    path('<uuid:pk>/actors/', api.session_actors_list, name='api_session_actors_list'),
    path('<uuid:pk>/actors/add/', api.session_actors_add, name='api_session_actors_add'),
    path('<uuid:pk>/actors/<uuid:actor_pk>/', api.session_actor_update, name='api_session_actor_update'),
    path('<uuid:pk>/actors/<uuid:actor_pk>/remove/', api.session_actor_remove, name='api_session_actor_remove'),
]
