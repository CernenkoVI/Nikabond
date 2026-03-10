import uuid

from django.conf import settings
from django.db import models

from useraccount.models import User

# Create your models here.
class Role(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(upload_to='uploads/roles', blank=True, default='')
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, default=None)

    actors = models.ManyToManyField('actor.Actor', related_name='roles', blank=True)

    project = models.ForeignKey(
        'project.Project',
        related_name='roles',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True)


    def image_url(self):
        if self.image:
            return f'{settings.WEBSITE_URL}{self.image.url}'
        return f'{settings.WEBSITE_URL}/media/uploads/placeholders/role.png'
