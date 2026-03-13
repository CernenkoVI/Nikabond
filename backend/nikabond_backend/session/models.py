import uuid

from django.conf import settings
from django.db import models

from useraccount.models import User


class Session(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    notes = models.TextField(default='', blank=True)

    project = models.ForeignKey(
        'project.Project',
        related_name='sessions',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    roles = models.ManyToManyField('role.Role', related_name='sessions', blank=True)

    scheduled_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')

    created_by = models.ForeignKey(
        User,
        related_name='created_sessions',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Legacy fields — kept temporarily for backwards compatibility (Phase 3: remove)
    start = models.DateField(null=True, blank=True)
    end = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title


class SessionActor(models.Model):
    OUTCOME_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('no_show', 'No Show'),
        ('cancelled', 'Cancelled'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session = models.ForeignKey(Session, related_name='session_actors', on_delete=models.CASCADE)
    actor = models.ForeignKey('actor.Actor', related_name='session_actors', on_delete=models.CASCADE)
    role = models.ForeignKey('role.Role', related_name='session_actors', on_delete=models.CASCADE)
    outcome = models.CharField(max_length=20, choices=OUTCOME_CHOICES, default='scheduled')
    time_slot = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(default='', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('session', 'actor', 'role')
        indexes = [
            models.Index(fields=['session', 'role'], name='idx_sessionactor_sess_role'),
        ]

    def __str__(self):
        return f'{self.actor} in {self.session} for {self.role} ({self.outcome})'
