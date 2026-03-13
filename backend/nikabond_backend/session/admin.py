from django.contrib import admin
from .models import Session, SessionActor


class SessionActorInline(admin.TabularInline):
    model = SessionActor
    extra = 0
    raw_id_fields = ('actor', 'role')


@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ('title', 'project', 'status', 'scheduled_at', 'created_at')
    list_filter = ('status',)
    inlines = [SessionActorInline]


@admin.register(SessionActor)
class SessionActorAdmin(admin.ModelAdmin):
    list_display = ('actor', 'session', 'role', 'outcome', 'time_slot')
    list_filter = ('outcome',)
