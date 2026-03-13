import uuid

from django.conf import settings
from django.db import models


class Collection(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    user = models.ForeignKey(
        'useraccount.User',
        related_name='collections',
        on_delete=models.CASCADE,
    )
    actors = models.ManyToManyField('actor.Actor', related_name='collections', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
