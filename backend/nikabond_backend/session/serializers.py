from rest_framework import serializers

from .models import Session, SessionActor

from role.serializers import RolesListSerializer
from project.serializers import ProjectDetailSerializer
from actor.serializers import ActorsListSerializer


class SessionActorSerializer(serializers.ModelSerializer):
    actor = ActorsListSerializer(read_only=True)
    role = RolesListSerializer(read_only=True)

    class Meta:
        model = SessionActor
        fields = (
            'id',
            'actor',
            'role',
            'outcome',
            'time_slot',
            'notes',
            'created_at',
        )


class SessionsListSerializer(serializers.ModelSerializer):
    roles = RolesListSerializer(many=True, read_only=True)
    actor_count = serializers.SerializerMethodField()

    class Meta:
        model = Session
        fields = (
            'id',
            'title',
            'scheduled_at',
            'status',
            'roles',
            'actor_count',
            # Legacy fields for backwards compat
            'start',
            'end',
        )

    def get_actor_count(self, obj):
        return obj.session_actors.count()


class SessionDetailSerializer(serializers.ModelSerializer):
    roles = RolesListSerializer(many=True, read_only=True)
    project = ProjectDetailSerializer(read_only=True)
    session_actors = SessionActorSerializer(many=True, read_only=True)

    class Meta:
        model = Session
        fields = (
            'id',
            'title',
            'notes',
            'scheduled_at',
            'status',
            'project',
            'roles',
            'session_actors',
            'created_by',
            'created_at',
            'updated_at',
            # Legacy fields for backwards compat
            'start',
            'end',
        )
