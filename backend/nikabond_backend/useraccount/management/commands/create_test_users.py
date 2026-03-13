from django.core.management.base import BaseCommand

from useraccount.models import User, CastingDirectorProfile
from actor.models import Actor
from agent.models import Agent


TEST_USERS = [
    {
        'email': 'actor@bla.com',
        'name': 'Test Actor',
        'role': 'actor',
        'password': 'Zabyl:27',
    },
    {
        'email': 'agent@bla.com',
        'name': 'Test Agent',
        'role': 'agent',
        'password': 'Zabyl:27',
    },
    {
        'email': 'casting@bla.com',
        'name': 'Test Casting Director',
        'role': 'casting_director',
        'password': 'Zabyl:27',
    },
]


class Command(BaseCommand):
    help = 'Create test user accounts with profiles for each role'

    def handle(self, *args, **options):
        for data in TEST_USERS:
            user, created = User.objects.get_or_create(
                email=data['email'],
                defaults={
                    'name': data['name'],
                    'role': data['role'],
                },
            )

            if created:
                user.set_password(data['password'])
                user.save()
                self.stdout.write(f'Created user: {data["email"]} ({data["role"]})')
            else:
                self.stdout.write(f'User already exists: {data["email"]}')
                continue

            if data['role'] == 'actor':
                Actor.objects.get_or_create(
                    user=user,
                    defaults={'name': user.name, 'email': user.email},
                )
            elif data['role'] == 'agent':
                Agent.objects.get_or_create(
                    user=user,
                    defaults={'name': user.name, 'email': user.email},
                )
            elif data['role'] == 'casting_director':
                CastingDirectorProfile.objects.get_or_create(user=user)

        self.stdout.write(self.style.SUCCESS('Done.'))
