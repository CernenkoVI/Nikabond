from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

from .models import User, CastingDirectorProfile


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'name', 'email', 'role', 'avatar_url',
        )


class CastingDirectorProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = CastingDirectorProfile
        fields = (
            'id', 'name', 'email', 'company', 'phone',
            'description', 'image_url',
        )


class CustomRegisterSerializer(RegisterSerializer):
    username = serializers.CharField(required=False, allow_blank=True, default='')
    name = serializers.CharField(max_length=255, required=True)
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES, required=True)

    def validate(self, data):
        data['username'] = data.get('name', '')
        return super().validate(data)

    def custom_signup(self, request, user):
        user.name = self.validated_data.get('name', '')
        user.role = self.validated_data.get('role', 'actor')
        user.save(update_fields=['name', 'role'])

        if user.role == 'actor':
            from actor.models import Actor
            Actor.objects.create(
                user=user,
                name=user.name,
                email=user.email,
            )
        elif user.role == 'agent':
            from agent.models import Agent
            Agent.objects.create(
                user=user,
                name=user.name,
                email=user.email,
            )
        elif user.role == 'casting_director':
            CastingDirectorProfile.objects.create(user=user)
