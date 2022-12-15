from django.contrib import admin

# Register your models here.

from .models import Wallet, User

admin.site.register(Wallet)
admin.site.register(User)
