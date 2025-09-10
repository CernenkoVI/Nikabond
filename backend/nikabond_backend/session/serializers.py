from rest_framework import serializers

from .models import Session

from project.serializers import RoleDetailSerializer

class SessionsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = (
            'id',
            'name',
            'start',
            'end',
        )


class SessionDetailSerializer(serializers.ModelSerializer):
    role = RoleDetailSerializer(read_only=True)

    class Meta:
        model = Session
        fields = (
            'id',
            'name',
            'description',
            'start',
            'end',
            'project',
        )
