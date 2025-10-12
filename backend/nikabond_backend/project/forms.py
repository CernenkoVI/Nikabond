from django.forms import ModelForm;

from .models import Project

class ProjectForm(ModelForm):
    class Meta:
        model = Project
        fields = {
            'name',
            'description',
            'shooting_start',
            'shooting_end',
            'callback_start',
            'callback_end',
            'tryons_start',
            'tryons_end',
            'rehearsal_start',
            'rehearsal_end',
            'image'
        }
