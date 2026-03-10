from datetime import date

from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny

from .models import Actor
from .serializers import ActorsListSerializer, ActorsDetailSerializer
from .forms import PortfolioForm, PortfolioEditForm

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def actors_list(request):
    role_id = request.query_params.get('role')
    if role_id:
        actors = Actor.objects.filter(roles__id=role_id)
    else:
        actors = Actor.objects.all()

    # Gender filter (comma-separated values)
    gender = request.query_params.get('gender')
    if gender:
        actors = actors.filter(gender__in=gender.split(','))

    # Ethnicity filter (comma-separated values)
    ethnicity = request.query_params.get('ethnicity')
    if ethnicity:
        actors = actors.filter(ethnicity__in=ethnicity.split(','))

    # Age filter (calculated from dob)
    today = date.today()
    age_min = request.query_params.get('age_min')
    age_max = request.query_params.get('age_max')
    if age_min:
        try:
            years = int(age_min)
            max_dob = today.replace(year=today.year - years)
        except ValueError:
            max_dob = today.replace(month=2, day=28, year=today.year - int(age_min))
        actors = actors.filter(dob__lte=max_dob)
    if age_max:
        try:
            years = int(age_max) + 1
            min_dob = today.replace(year=today.year - years)
        except ValueError:
            min_dob = today.replace(month=2, day=28, year=today.year - int(age_max) - 1)
        actors = actors.filter(dob__gte=min_dob)

    # Language filter (substring match)
    language = request.query_params.get('language')
    if language:
        actors = actors.filter(languages__icontains=language)

    # Height filter (range)
    height_min = request.query_params.get('height_min')
    height_max = request.query_params.get('height_max')
    if height_min:
        actors = actors.filter(height__gte=float(height_min))
    if height_max:
        actors = actors.filter(height__lte=float(height_max))

    # Hair color filter
    haircolor = request.query_params.get('haircolor')
    if haircolor:
        actors = actors.filter(haircolor__icontains=haircolor)

    # Hairstyle filter
    hairstyle = request.query_params.get('hairstyle')
    if hairstyle:
        actors = actors.filter(hairstyle__icontains=hairstyle)

    # Eye color filter
    eyecolor = request.query_params.get('eyecolor')
    if eyecolor:
        actors = actors.filter(eyecolor__icontains=eyecolor)

    # Skills filter
    skills = request.query_params.get('skills')
    if skills:
        actors = actors.filter(skills__icontains=skills)

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
#        actor.agent = request.user
        actor.save()

        return JsonResponse({'success': True})
    else:
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def update_actor(request, pk):
    actor = get_object_or_404(Actor, pk=pk)
    form = PortfolioEditForm(request.POST, request.FILES, instance=actor)

    if form.is_valid():
        actor = form.save(commit=False)
        actor.save()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'errors': form.errors.as_json()}, status=400)
