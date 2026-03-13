import uuid

from django.conf import settings
from django.db import models

from useraccount.models import User

# Create your models here.

class Agent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='agent_profile',
        null=True,
        blank=True
    )

    image = models.ImageField(upload_to='uploads/agents', blank=True, default='')

    name = models.CharField(max_length=255)

    description = models.CharField(max_length=255, blank=True, default='')
    email = models.EmailField(max_length=254, unique=True, null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True, default='')


    created_at = models.DateTimeField(auto_now_add=True)


    def image_url(self):
        if self.image:
            return f'{settings.WEBSITE_URL}{self.image.url}'
        return f'{settings.WEBSITE_URL}/media/uploads/placeholders/agent.png'
