from rest_framework import serializers
from market.models import NFT, Transaction

class NFTSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFT
        fields = (
            'token_id',
            'creator_fee',
            'title',
            'description',
            'price',
            'image',
            'creator_id',
            'owner_id',
            'date_created',
            'history',
            'chain',
            'last_sale',
            'for_sale',
        )

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = (
            'transaction_id',
            'status',
            'value',
            'time_stamp',
            'transaction_fee',
            'gas_price',
            'buyer_id',
            'seller_id',
            'token_id',
        )

# class CreateNFTSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Create
#         fields = (
#             'token_id',
#             'user_id',
#         )