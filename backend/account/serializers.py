from rest_framework import serializers
from account.models import Wallet, User

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = (
            'wallet_id',
            'wallet_balance',
            'date_created',
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'password',
            'wallet_address',
            'date_joined',
        )


