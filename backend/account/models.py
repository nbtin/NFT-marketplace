from django.db import models

# Create your models here.

class Wallet(models.Model):
    wallet_id = models.CharField(primary_key=True, max_length=40, auto_created = True)
    user_id = models.CharField(max_length=40, default='')
    wallet_balance = models.FloatField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.wallet_id
    
    def getWalletId(self):
        return str(self.wallet_id)
        
class User(models.Model):
    user_id = models.CharField(primary_key=True, max_length=40, blank=True)
    username = models.CharField(max_length=255, blank=True)
    email = models.EmailField()
    password = models.CharField(max_length=64)
    wallet_address = models.ForeignKey(Wallet, default = '',on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.username
    
    def isAuthenticated(self, username, password):
        return username == self.email and password == self.password

    def getWalletAddress(self):
        return str(self.wallet_address)
