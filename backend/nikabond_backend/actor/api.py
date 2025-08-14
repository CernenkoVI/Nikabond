from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Actor
from .serializers import ActorsListSerializer, ActorsDetailSerializer
from .forms import PortfolioForm

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def actors_list(request):
    actors = Actor.objects.all()
    serializer = ActorsListSerializer(actors, many=True)

    return JsonResponse({
        'data': serializer.data
    })


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def actors_detail(request, pk):
    actor = Actor.objects.get(pk=pk)

    serializer = ActorsDetailSerializer(actor, many=False)
    return JsonResponse(serializer.data)



@api_view(['POST', 'FILES'])
def create_portfolio(request):
    form = PortfolioForm(request.POST, request.FILES)

    if form.is_valid():
        actor = form.save(commit=False)
        actor.agent = request.user
        actor.save()

        return JsonResponse({'success': True})
    else:
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()}, status=400)
