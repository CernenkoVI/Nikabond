from django.db import migrations


def forwards(apps, schema_editor):
    """Copy existing Role.actors M2M entries into the new RoleActor through table."""
    Role = apps.get_model('role', 'Role')
    RoleActor = apps.get_model('role', 'RoleActor')
    for role in Role.objects.prefetch_related('actors').all():
        for actor in role.actors.all():
            RoleActor.objects.get_or_create(
                role=role,
                actor=actor,
                defaults={'status': 'shortlisted'},
            )


def backwards(apps, schema_editor):
    """Reverse: ensure Role.actors M2M matches RoleActor entries."""
    RoleActor = apps.get_model('role', 'RoleActor')
    for ra in RoleActor.objects.select_related('role', 'actor').all():
        ra.role.actors.add(ra.actor)


class Migration(migrations.Migration):

    dependencies = [
        ('role', '0004_roleactor'),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]
