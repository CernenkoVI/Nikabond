from django.forms import ModelForm

from .models import CastingDirectorProfile


class CastingDirectorProfileForm(ModelForm):
    class Meta:
        model = CastingDirectorProfile
        fields = {
            'company',
            'phone',
            'description',
            'image',
        }
