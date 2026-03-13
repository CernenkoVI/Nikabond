import uuid
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0003_session_roles'),
        ('actor', '0001_initial'),
        ('role', '0004_roleactor'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        # Rename name -> title
        migrations.RenameField(
            model_name='session',
            old_name='name',
            new_name='title',
        ),
        # Rename description -> notes, change to TextField
        migrations.RemoveField(
            model_name='session',
            name='description',
        ),
        migrations.AddField(
            model_name='session',
            name='notes',
            field=models.TextField(blank=True, default=''),
        ),
        # Add scheduled_at
        migrations.AddField(
            model_name='session',
            name='scheduled_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        # Add status
        migrations.AddField(
            model_name='session',
            name='status',
            field=models.CharField(
                choices=[('draft', 'Draft'), ('scheduled', 'Scheduled'), ('completed', 'Completed'), ('cancelled', 'Cancelled')],
                default='draft',
                max_length=20,
            ),
        ),
        # Add created_by
        migrations.AddField(
            model_name='session',
            name='created_by',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name='created_sessions',
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        # Add updated_at
        migrations.AddField(
            model_name='session',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        # Make start/end nullable for backwards compat (will be removed in Phase 3)
        migrations.AlterField(
            model_name='session',
            name='start',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='session',
            name='end',
            field=models.DateField(blank=True, null=True),
        ),
        # Create SessionActor
        migrations.CreateModel(
            name='SessionActor',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('outcome', models.CharField(choices=[('scheduled', 'Scheduled'), ('confirmed', 'Confirmed'), ('completed', 'Completed'), ('no_show', 'No Show'), ('cancelled', 'Cancelled')], default='scheduled', max_length=20)),
                ('time_slot', models.DateTimeField(blank=True, null=True)),
                ('notes', models.TextField(blank=True, default='')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='session_actors', to='session.session')),
                ('actor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='session_actors', to='actor.actor')),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='session_actors', to='role.role')),
            ],
            options={
                'unique_together': {('session', 'actor', 'role')},
                'indexes': [
                    models.Index(fields=['session', 'role'], name='idx_sessionactor_sess_role'),
                ],
            },
        ),
    ]
