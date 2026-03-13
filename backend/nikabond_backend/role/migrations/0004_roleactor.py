import uuid
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('role', '0003_alter_role_image'),
        ('actor', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RoleActor',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('status', models.CharField(choices=[('shortlisted', 'Shortlisted'), ('callback', 'Callback'), ('on_hold', 'On Hold'), ('cast', 'Cast'), ('passed', 'Passed')], default='shortlisted', max_length=20)),
                ('notes', models.TextField(blank=True, default='')),
                ('added_at', models.DateTimeField(auto_now_add=True)),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='role_actors', to='role.role')),
                ('actor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='role_actors', to='actor.actor')),
            ],
            options={
                'unique_together': {('role', 'actor')},
                'indexes': [
                    models.Index(fields=['role', 'status'], name='idx_roleactor_role_status'),
                ],
            },
        ),
    ]
