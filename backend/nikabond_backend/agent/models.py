import uuid

from django.conf import settings
from django.db import models

from useraccount.models import User

# Create your models here.

class Agent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    image = models.ImageField(upload_to='uploads/agents')

    name = models.CharField(max_length=255)

    description = models.CharField(max_length=255, default=None)
    email = models.EmailField(max_length=254, unique=True, default=None)
    phone = models.CharField(max_length=20, default=None)
    

    created_at = models.DateTimeField(auto_now_add=True)


    def image_url(self):
        return f'{settings.WEBSITE_URL}{self.image.url}'