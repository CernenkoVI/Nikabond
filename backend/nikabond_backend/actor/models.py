import uuid

from django.conf import settings
from django.db import models

from useraccount.models import User

# Gender choices
class Gender(models.TextChoices):
    MALE = 'male', 'Male'
    FEMALE = 'female', 'Female'
    NON_BINARY = 'nonbinary', 'Non-binary'
    OTHER = 'other', 'Other'
    PREFER_NOT_TO_SAY = 'no_answer', 'prefer not to say'

# Ethnicity choices
class Ethnicity(models.TextChoices):
    BLACK = 'black', 'Black'
    WHITE = 'white', 'White'
    ASIAN = 'asian', 'Asian'
    OTHER = 'other', 'Other'
    PREFER_NOT_TO_SAY = 'no_answer', 'prefer not to say'

# Actor model
class Actor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    image = models.ImageField(upload_to='uploads/actors')

    name = models.CharField(max_length=255)
    dob = models.DateField(default=None)
    description = models.CharField(max_length=255, default=None)
    email = models.EmailField(max_length=254, unique=True, default=None)
    phone = models.CharField(max_length=20, default=None)
    haircolor = models.CharField(max_length=255)
    hairstyle = models.CharField(max_length=255)
    eyecolor = models.CharField(max_length=255)
    gender = models.CharField(
        max_length=50,
        choices=Gender.choices,
        null=True,
        blank=True,
        default=Gender.PREFER_NOT_TO_SAY,
    )
    gender_other = models.CharField(
    max_length=100,
    blank=True,
    help_text="If you selected Other, you can specify here."
    )
    ethnicity = models.CharField(
        max_length=50,
        choices=Ethnicity.choices,
        null=True,
        blank=True,
        default=None,
    )

    info = models.TextField()
    experience = models.CharField(max_length=255)
    skills = models.CharField(max_length=255)
    occupations = models.CharField(max_length=255)
    languages = models.CharField(max_length=255)
    country = models.CharField(max_length=255, default='UNK')
    country_code = models.CharField(max_length=255, default='XX')
    licence = models.CharField(max_length=255)

    height = models.FloatField(null=True, blank=True)

    agent = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='actors',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    citizenship = models.CharField(max_length=100, default='unk')
    work_permits = models.CharField(max_length=100, default='unk')
    size = models.CharField(max_length=100, default='unk')
    shoe_size = models.CharField(max_length=100, default='unk')
    cwh = models.CharField(max_length=100, default='unk')

    # favourited

    def image_url(self):
        return f'{settings.WEBSITE_URL}{self.image.url}'
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if self.gender == Gender.OTHER and not self.gender_other:
            raise ValidationError({"gender_other": "Please specify gender when 'Other' is selected."})