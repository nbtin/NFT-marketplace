from django.db import models
import random, string

# Create your models here.

def generate_username(email):
    return email.split('@')[0]

def generate_address():
    return '0x' + ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(40))

def updateBalance(user_id, value):
    wallet = User.objects.get(user_id=user_id)['wallet_address']
    wallet.updateBalance(value)

class Wallet(models.Model):
    wallet_id = models.CharField(primary_key=True, max_length=42, default=generate_address, unique=True)
    wallet_balance = models.FloatField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.wallet_id
    
    def getWalletId(self):
        return str(self.wallet_id)

    def updateBalance(self, value):
        if self.wallet_balance + value >= 0:
            self.wallet_balance += value
            return True
        else:
            return False

    def getWalletData(self):
        return self.wallet_balance, self.date_created 
        
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, blank=False, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=64)
    wallet_address = models.ForeignKey(Wallet, to_field="wallet_id", on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.username
    
    def isAuthenticated(self, username, password):
        return username == self.email and password == self.password

    def getWalletAddress(self):
        return str(self.wallet_address)
    
    def updateBalance(self, value):
        return self.wallet_address.updateBalance(value)