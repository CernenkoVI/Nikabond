from rest_framework import serializers

from .models import Role

from project.serializers import ProjectDetailSerializer
from actor.serializers import ActorsListSerializer


class RolesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = (
            'id',
            'image_url',
            'name',
            'description',
            'project_id',
        )


class RoleDetailSerializer(serializers.ModelSerializer):
    project = ProjectDetailSerializer(read_only=True)
    actors = ActorsListSerializer(many=True, read_only=True)

    class Meta:
        model = Role
        fields = (
            'id',
            'image_url',
            'name',
            'description',
            'project',
            'actors',
        )
