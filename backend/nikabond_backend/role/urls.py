from django.urls import path
from . import api

urlpatterns = [
    path('', api.roles_list, name='api_roles_list'),
    path('create/', api.create_role, name='api_create_role'),
    path('<uuid:pk>/update/', api.update_role, name='api_update_role'),
    path('<uuid:pk>/', api.role_detail, name='api_role_detail'),
    path('<uuid:pk>/actors/', api.update_role_actors, name='api_update_role_actors'),
    # New shortlist endpoints
    path('<uuid:pk>/shortlist/', api.shortlist_list, name='api_shortlist_list'),
    path('<uuid:pk>/shortlist/add/', api.shortlist_add, name='api_shortlist_add'),
    path('<uuid:pk>/shortlist/<uuid:actor_pk>/', api.shortlist_update, name='api_shortlist_update'),
    path('<uuid:pk>/shortlist/<uuid:actor_pk>/remove/', api.shortlist_remove, name='api_shortlist_remove'),
    # Pipeline view
    path('<uuid:pk>/pipeline/', api.role_pipeline, name='api_role_pipeline'),
]
