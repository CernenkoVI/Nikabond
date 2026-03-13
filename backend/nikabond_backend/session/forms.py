from django.forms import ModelForm

from .models import Session


class SessionForm(ModelForm):
    class Meta:
        model = Session
        fields = {
            'title',
            'notes',
            'project',
            'scheduled_at',
            'status',
            'roles',
            # Legacy fields accepted for backwards compat
            'start',
            'end',
        }
