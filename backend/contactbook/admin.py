from django.contrib import admin
from .models import Contact

class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email')

# Register your models here.

admin.site.register(Contact, ContactAdmin)