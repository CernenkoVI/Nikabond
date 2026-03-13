from django.urls import path
from . import api

urlpatterns = [
    path('', api.collections_list, name='api_collections_list'),
    path('create/', api.create_collection, name='api_create_collection'),
    path('<uuid:pk>/', api.collection_detail, name='api_collection_detail'),
    path('<uuid:pk>/update/', api.update_collection, name='api_update_collection'),
    path('<uuid:pk>/add-actors/', api.add_actors_to_collection, name='api_add_actors_to_collection'),
    path('<uuid:pk>/update-actors/', api.update_collection_actors, name='api_update_collection_actors'),
    path('<uuid:pk>/delete/', api.delete_collection, name='api_delete_collection'),
]
