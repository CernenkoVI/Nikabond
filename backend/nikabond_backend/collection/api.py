from django.db.models import Count
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Collection
from .serializers import CollectionListSerializer, CollectionDetailSerializer
from .forms import CollectionForm


@api_view(['GET'])
def collections_list(request):
    collections = Collection.objects.filter(user=request.user).annotate(
        actors_count=Count('actors')
    ).order_by('-created_at')
    serializer = CollectionListSerializer(collections, many=True)

    return JsonResponse({
        'data': serializer.data
    })


@api_view(['GET'])
def collection_detail(request, pk):
    collection = get_object_or_404(Collection, pk=pk, user=request.user)
    serializer = CollectionDetailSerializer(collection)
    return JsonResponse(serializer.data)


@api_view(['POST'])
def create_collection(request):
    form = CollectionForm(request.POST)

    if form.is_valid():
        collection = form.save(commit=False)
        collection.user = request.user
        collection.save()
        form.save_m2m()

        actor_ids = request.POST.getlist('actors')
        if actor_ids:
            collection.actors.set(actor_ids)

        return JsonResponse({'success': True, 'id': str(collection.id)})
    else:
        return JsonResponse({'errors': form.errors.as_json()}, status=400)


@api_view(['POST'])
def update_collection(request, pk):
    collection = get_object_or_404(Collection, pk=pk, user=request.user)
    form = CollectionForm(request.POST, instance=collection)

    if form.is_valid():
        collection = form.save()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'errors': form.errors.as_json()}, status=400)


@api_view(['POST'])
def add_actors_to_collection(request, pk):
    collection = get_object_or_404(Collection, pk=pk, user=request.user)
    actor_ids = request.POST.getlist('actors')
    collection.actors.add(*actor_ids)
    return JsonResponse({'success': True})


@api_view(['POST'])
def update_collection_actors(request, pk):
    collection = get_object_or_404(Collection, pk=pk, user=request.user)
    actor_ids = request.POST.getlist('actors')
    collection.actors.set(actor_ids)
    return JsonResponse({'success': True})


@api_view(['POST'])
def delete_collection(request, pk):
    collection = get_object_or_404(Collection, pk=pk, user=request.user)
    collection.delete()
    return JsonResponse({'success': True})
