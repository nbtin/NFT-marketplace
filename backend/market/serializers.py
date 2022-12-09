from rest_framework import serializers
from market.models import NFT

class NFTSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFT
        fields = (
            'token_id',
            'creator_fee',
            'title',
            'description',
            'price',
            'image_url',
            'date_created',
            'history',
            'chain',
            'owner_id',
            'creator_id',
            'last_sale',
        )

