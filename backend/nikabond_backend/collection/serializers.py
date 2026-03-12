from rest_framework import serializers

from .models import Collection
from actor.serializers import ActorsListSerializer


class CollectionListSerializer(serializers.ModelSerializer):
    actors_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Collection
        fields = (
            'id',
            'name',
            'description',
            'actors_count',
            'created_at',
        )


class CollectionDetailSerializer(serializers.ModelSerializer):
    actors = ActorsListSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = (
            'id',
            'name',
            'description',
            'actors',
            'created_at',
        )
