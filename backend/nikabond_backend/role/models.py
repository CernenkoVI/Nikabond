import uuid

from django.conf import settings
from django.db import models

from useraccount.models import User


class Role(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(upload_to='uploads/roles', blank=True, default='')
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, default=None)

    # Legacy M2M — kept temporarily for backwards compatibility (Phase 3: remove)
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


class RoleActor(models.Model):
    STATUS_CHOICES = [
        ('shortlisted', 'Shortlisted'),
        ('callback', 'Callback'),
        ('on_hold', 'On Hold'),
        ('cast', 'Cast'),
        ('passed', 'Passed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.ForeignKey(Role, related_name='role_actors', on_delete=models.CASCADE)
    actor = models.ForeignKey('actor.Actor', related_name='role_actors', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='shortlisted')
    notes = models.TextField(default='', blank=True)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('role', 'actor')
        indexes = [
            models.Index(fields=['role', 'status'], name='idx_roleactor_role_status'),
        ]

    def __str__(self):
        return f'{self.actor} → {self.role} ({self.status})'
