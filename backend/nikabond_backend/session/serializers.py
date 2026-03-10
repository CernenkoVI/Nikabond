from rest_framework import serializers

from .models import Session

from role.serializers import RolesListSerializer
from project.serializers import ProjectDetailSerializer


class SessionsListSerializer(serializers.ModelSerializer):
    roles = RolesListSerializer(many=True, read_only=True)

    class Meta:
        model = Session
        fields = (
            'id',
            'name',
            'start',
            'end',
            'roles',
        )


class SessionDetailSerializer(serializers.ModelSerializer):
    roles = RolesListSerializer(many=True, read_only=True)
    project = ProjectDetailSerializer(read_only=True)

    class Meta:
        model = Session
        fields = (
            'id',
            'name',
            'description',
            'start',
            'end',
            'project',
            'roles',
        )
