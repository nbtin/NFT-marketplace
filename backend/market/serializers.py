from rest_framework import serializers
from market.models import NFT, Transaction, Follow

class NFTSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFT
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

# class CreateNFTSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Create
#         fields = (
#             'token_id',
#             'user_id',
#         )

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'