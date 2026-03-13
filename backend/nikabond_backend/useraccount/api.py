from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from .models import CastingDirectorProfile
from .serializers import UserDetailSerializer, CastingDirectorProfileSerializer
from .forms import CastingDirectorProfileForm
from actor.serializers import ActorsDetailSerializer
from agent.serializers import AgentsDetailSerilizer


@api_view(['GET'])
def my_profile(request):
    user = request.user
    user_data = UserDetailSerializer(user).data

    profile_data = {}

    if user.role == 'actor':
        actor = getattr(user, 'actor_profile', None)
        if actor:
            profile_data = ActorsDetailSerializer(actor).data

    elif user.role == 'agent':
        agent = getattr(user, 'agent_profile', None)
        if agent:
            profile_data = AgentsDetailSerilizer(agent).data

    elif user.role == 'casting_director':
        cd = getattr(user, 'casting_director_profile', None)
        if cd:
            profile_data = CastingDirectorProfileSerializer(cd).data

    return JsonResponse({
        'user': user_data,
        'profile': profile_data,
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def update_casting_director(request, pk):
    profile = get_object_or_404(CastingDirectorProfile, pk=pk)
    form = CastingDirectorProfileForm(request.POST, request.FILES, instance=profile)

    if form.is_valid():
        form.save()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'errors': form.errors.as_json()}, status=400)
