from django.db import models

# Create your models here.

class Wallet(models.Model):
    wallet_id = models.AutoField(primary_key=True)
    address = models.CharField(auto_created=True, max_length=64, unique=True)
    wallet_balance = models.FloatField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.wallet_address

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=64)
    wallet_address = models.ForeignKey(Wallet, to_field='address', on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username