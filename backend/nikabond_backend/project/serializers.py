from rest_framework import serializers

from .models import Project

from useraccount.serializers import UserDetailSerializer

class ProjectsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            'id',
            'image_url',
            'name',
            'shooting_start',
            'shooting_end',
            'description'
        )


class ProjectDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            'id',
            'image_url',
            'name',
            'description',
            'shooting_start',
            'shooting_end',
            'callback_start',
            'callback_end',
            'tryons_start',
            'tryons_end',
            'rehearsal_start',
            'rehearsal_end',
        )
