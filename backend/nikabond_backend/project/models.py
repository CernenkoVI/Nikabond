import uuid

from django.conf import settings
from django.db import models

from useraccount.models import User

# Create your models here.
class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(upload_to='uploads/projects', blank=True, default='')
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, default=None)

    shooting_start = models.DateField()
    shooting_end = models.DateField()
    callback_start = models.DateField()
    callback_end = models.DateField()
    tryons_start = models.DateField()
    tryons_end = models.DateField()
    rehearsal_start = models.DateField()
    rehearsal_end = models.DateField()
    
    created_at = models.DateTimeField(auto_now_add=True)


    def image_url(self):
        if self.image:
            return f'{settings.WEBSITE_URL}{self.image.url}'
        return f'{settings.WEBSITE_URL}/media/uploads/placeholders/project.png'
