from django.contrib import admin

# Register your models here.

from .models import NFT, Transaction

admin.site.register(NFT)
admin.site.register(Transaction)