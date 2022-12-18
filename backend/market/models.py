from django.db import models
from account.models import User
# Create your models here.
class NFT(models.Model):
    token_id = models.AutoField(primary_key=True)
    creator_fee = models.FloatField(default=0.01)   
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    price = models.FloatField(default=0)
    image = models.ImageField(upload_to='NFTs/', default='NFTs/default.jpg')
    date_created = models.DateTimeField(auto_now_add=True)
    history = models.CharField(max_length=1000, default='')
    chain = models.CharField(max_length=100, default='Ethereum')
    owner_id = models.ForeignKey(User, to_field="user_id",related_name='owner_id', on_delete=models.CASCADE)
    creator_id = models.ForeignKey(User, to_field="user_id",related_name='creator_id', on_delete=models.CASCADE)
    last_sale = models.DateTimeField(blank=True, null=True)
    for_sale = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
    def isForSale(self):
        return self.for_sale

    def isOwner(self, id):
        return self.owner_id.user_id == id

    def save(self):
        super(NFT, self).save()

    def changeOwner(self, new_owner):
        self.owner_id = new_owner
        self.save()

    def updateHistory(self, transaction_id):
        if len(self.history) != 0:
            self.history += ", "
        self.history += str(transaction_id)
        self.save()

class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    status = models.IntegerField(default=0) # 0: processing, 1: success, -1: failure
    # value = models.FloatField()
    time_stamp = models.DateTimeField(auto_now_add=True)
    transaction_fee = models.IntegerField()
    gas_price = models.FloatField()
    buyer_id = models.ForeignKey(User, related_name='buyer_id', on_delete=models.CASCADE)
    seller_id = models.ForeignKey(User, related_name='seller_id', on_delete=models.CASCADE)
    token_id = models.ForeignKey(NFT, to_field='token_id', on_delete=models.CASCADE)

    def __str__(self):
        return self.transaction_id

# class Create(models.Model):
#     token_id = models.ForeignKey(NFT, related_name='token_id', on_delete=models.CASCADE)
#     user_id = models.ForeignKey(User, related_name='user_id', on_delete=models.CASCADE)
