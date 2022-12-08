from django.db import models
import random, string

# Create your models here.

def generate_address():
    return '0x' + ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(40))

class Wallet(models.Model):
    wallet_id = models.CharField(primary_key=True, max_length=42, default=generate_address, unique=True)
    wallet_balance = models.FloatField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.wallet_id
    
    def getWalletId(self):
        return str(self.wallet_id)
        
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
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
