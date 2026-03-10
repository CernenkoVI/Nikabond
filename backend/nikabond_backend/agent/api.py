from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny

from .models import Agent
from .serializers import AgentsDetailSerilizer
from .serializers import AgentsListSerializer
from .forms import AgentForm



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def agents_detail(request, pk):
    agent = Agent.objects.get(pk=pk)

    serializer = AgentsDetailSerilizer(agent, many=False)
    return JsonResponse(serializer.data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def agents_list(request):
    agents = Agent.objects.all()
    serializer = AgentsListSerializer(agents, many=True)

    return JsonResponse({
        'data': serializer.data
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def create_agent(request):
    form = AgentForm(request.POST, request.FILES)

    if form.is_valid():
        agent = form.save(commit=False)
        agent.save()

        return JsonResponse({'success': True})
    else:
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def update_agent(request, pk):
    agent = get_object_or_404(Agent, pk=pk)
    form = AgentForm(request.POST, request.FILES, instance=agent)

    if form.is_valid():
        agent = form.save(commit=False)
        agent.save()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'errors': form.errors.as_json()}, status=400)
