from django.db import models
from account.models import User
# Create your models here.
class NFT(models.Model):
    token_id = models.AutoField(primary_key=True)
    creator_fee = models.IntegerField()
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    price = models.FloatField()
    image_url = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)
    history = models.CharField(max_length=100)
    chain = models.CharField(max_length=100)
    owner_id = models.ForeignKey(User, related_name='owner_id', on_delete=models.CASCADE)
    creator_id = models.ForeignKey(User, related_name='creator_id', on_delete=models.CASCADE)
    last_sale = models.DateTimeField()
    
    def __str__(self):
        return self.token_id

