from rest_framework import serializers

from .models import Agent

class AgentsDetailSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = (
            'id',
            'name',
            'description',
            'email',
            'phone',
            'image_url',
        )
