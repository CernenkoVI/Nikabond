from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Agent
from .serializers import AgentsDetailSerilizer



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def agents_detail(request, pk):
    agent = Agent.objects.get(pk=pk)

    serializer = AgentsDetailSerilizer(agent, many=False)
    return JsonResponse(serializer.data)