from datetime import datetime, timezone
from django.db import migrations


def forwards(apps, schema_editor):
    """Copy existing Session.start into scheduled_at as a datetime."""
    Session = apps.get_model('session', 'Session')
    for session in Session.objects.all():
        if session.start:
            session.scheduled_at = datetime.combine(
                session.start, datetime.min.time(), tzinfo=timezone.utc
            )
            session.save(update_fields=['scheduled_at'])


def backwards(apps, schema_editor):
    """Reverse: copy scheduled_at back to start."""
    Session = apps.get_model('session', 'Session')
    for session in Session.objects.all():
        if session.scheduled_at:
            session.start = session.scheduled_at.date()
            session.save(update_fields=['start'])


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0004_session_updates_sessionactor'),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]
