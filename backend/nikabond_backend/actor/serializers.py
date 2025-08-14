from rest_framework import serializers

from .models import Actor

from useraccount.serializers import UserDetailSerializer

class ActorsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = (
            'id',
            'image_url',
            'name',
            'description'
        )


class ActorsDetailSerializer(serializers.ModelSerializer):
    agent = UserDetailSerializer(read_only=True)
    
    class Meta:
        model = Actor
        fields = (
            'id',
            'image_url',
            'name',
            'description',
            'dob',
            'email',
            'phone',
            'haircolor',
            'hairstyle',
            'eyecolor',
            'gender',
            'info',
            'experience',
            'skills',
            'occupations',
            'languages',
            'country',
            'licence',
            'height',
            'agent',



            'citizenship',
            'work_permits',
            'size',
            'shoe_size',
            'cwh'
        )
