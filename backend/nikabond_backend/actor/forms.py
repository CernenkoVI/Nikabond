from django.forms import ModelForm;

from .models import Actor

class PortfolioForm(ModelForm):
    class Meta:
        model = Actor
        fields = {
            'name',
            'dob',
            'phone',
            'email',
            'gender',
            'gender_other',
            'description',
            'country',
            'country_code',
            'image'
        }


class PortfolioEditForm(ModelForm):
    class Meta:
        model = Actor
        fields = {
            'name',
            'dob',
            'phone',
            'email',
            'gender',
            'gender_other',
            'description',
            'country',
            'country_code',
            'image',
            'haircolor',
            'hairstyle',
            'eyecolor',
            'ethnicity',
            'info',
            'experience',
            'skills',
            'occupations',
            'languages',
            'licence',
            'height',
            'citizenship',
            'work_permits',
            'size',
            'shoe_size',
            'cwh',
        }
