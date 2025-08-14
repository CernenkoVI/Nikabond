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
