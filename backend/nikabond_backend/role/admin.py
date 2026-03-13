from django.contrib import admin
from .models import Role, RoleActor


class RoleActorInline(admin.TabularInline):
    model = RoleActor
    extra = 0
    raw_id_fields = ('actor',)


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'project', 'created_at')
    inlines = [RoleActorInline]


@admin.register(RoleActor)
class RoleActorAdmin(admin.ModelAdmin):
    list_display = ('actor', 'role', 'status', 'added_at')
    list_filter = ('status',)
