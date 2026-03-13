import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models

class CustomUserManager(UserManager):
    def _create_user(self, name, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not specified a valid email address")
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)

        return user
    
    def create_user(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(name, email, password, **extra_fields)
    
    def create_superuser(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(name, email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('actor', 'Actor'),
        ('agent', 'Agent'),
        ('casting_director', 'Casting Director'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    avatar = models.ImageField(upload_to='uploads/avatars')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='actor')

    is_active = models.BooleanField(default=True)  # Todo needs to be changed to False for email validation
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email  # default username = email
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email

    def avatar_url(self):
        if self.avatar:
            return f'{settings.WEBSITE_URL}{self.avatar.url}'
        else:
            return ''


class CastingDirectorProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='casting_director_profile')
    image = models.ImageField(upload_to='uploads/casting_directors', blank=True, default='')
    company = models.CharField(max_length=255, blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')
    description = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.name} (Casting Director)'

    def image_url(self):
        if self.image:
            return f'{settings.WEBSITE_URL}{self.image.url}'
        return ''