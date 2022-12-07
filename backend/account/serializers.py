from rest_framework import serializers
from account.models import Wallet, User

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = (
            'wallet_id',
            'user_id',
            'wallet_balance',
            'balance_created',
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'user_id',
            'username',
            'email',
            'password',
            'wallet_address',
            'date_joined',
        )


