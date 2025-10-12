from django.forms import ModelForm;

from .models import Agent

class AgentForm(ModelForm):
    class Meta:
        model = Agent
        fields = {
            'name',
            'description',
            'phone',
            'email',
            'image'
        }
