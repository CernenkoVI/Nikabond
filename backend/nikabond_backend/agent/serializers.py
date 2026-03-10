from rest_framework import serializers

from .models import Agent


class AgentsDetailSerilizer(serializers.ModelSerializer):
    actors = serializers.SerializerMethodField()

    class Meta:
        model = Agent
        fields = (
            'id',
            'name',
            'description',
            'email',
            'phone',
            'image_url',
            'actors',
        )

    def get_actors(self, obj):
        from actor.serializers import ActorsListSerializer
        return ActorsListSerializer(obj.actors.all(), many=True).data

class AgentsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = (
            'id',
            'image_url',
            'name',
        )
