import uuid

from django.conf import settings
from django.db import models

from useraccount.models import User

# Create your models here.
class Session(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, default=None)

    project = models.ForeignKey(
        'role.Role',
        related_name='sessions',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    
    start = models.DateField()
    end = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)
