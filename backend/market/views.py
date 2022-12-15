from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.models import User, Wallet
from market.models import NFT, Transaction
from market.serializers import NFTSerializer, TransactionSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.core import serializers
from django.http import JsonResponse


# Create your views here.
def getAllNFTs():
    nfts = list(NFT.objects.all().values())
    return nfts

def getUserNFTs(user_id):
    nfts = NFT.objects.filter(owner_id=user_id)
    return nfts 

def getSearchedNFTs(search):
    nfts = NFT.objects.filter(title__contains=search)
    return nfts

def updateBalance(seller_id, buyer_id, token_id):
    seller = User.objects.filter(user_id=seller_id)
    buyer = User.objects.filter(user_id=buyer_id)
    nfts = NFT.objects.filter(token_id = token_id)
    creator = nfts['creator_id']
    creator_fee = nfts['creator_fee']
    value = nfts['value']
    transaction_fee = nfts['transaction_fee']
    gas_price = nfts['gas_price']
    if buyer and creator and seller:
        buyer.updateBalance(-float(value))
        creator.updateBalance(int(creator_fee) * 0.01 * float(value))
        seller.updateBalance(float(value) * 
                                (1 - int(creator_fee) * 0.01 - int(transaction_fee) * 0.01 - float(gas_price)))
    



class GetNFTs(APIView):
    def get(self, request, *args, **kwargs):
        try:
            user_data = JSONParser().parse(request)
            if user_data['type'] == 'all':
                ans = getAllNFTs()
            elif user_data['type'] == 'user':
                ans = getUserNFTs(user_data['user_id'])
            elif user_data['type'] == 'search':
                ans = getSearchedNFTs(user_data['key_word'])
            return Response({"status": "success", "data": ans}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"status": "error", "data": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)


class CreateNFT(APIView):
    def post(self, request, *args, **kwargs):
        try:
            current_data = {
                'title': request.data['title'],
                'description': request.data['description'],
                'creator_id': int(request.data['creatorId']),
                'owner_id': int(request.data['creatorId']),
                'image': request.data['image'],
            }

            print(current_data)

            nft_serializer = NFTSerializer(data=current_data)
            if nft_serializer.is_valid():
                nft_serializer.save()
                return Response({"status": "success", "data": nft_serializer.data}, status=status.HTTP_200_OK)
            print(nft_serializer.errors)
            return Response({"status": "error", "data": nft_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({"status": "error", "data": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

        if nft_serializer.is_valid():
            nft_serializer.save()
            return Response({"status": "error", "data": nft_serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": nft_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ProcessTransaction(APIView):
    def post(self, request, *args, **kwargs):
        transaction_data=JSONParser().parse(request)
        transaction_serializers=TransactionSerializer(data=transaction_data)
        if transaction_serializers.is_valid():
            transaction_serializers.save()
            seller = transaction_data['seller_id']
            buyer = transaction_data['buyer_id']
            token = transaction_data['token_id']
            if updateBalance(seller, buyer, token):
                return Response({"status": "success", "data": transaction_serializers.data}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "error", "data": transaction_serializers.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"status": "error", "data": transaction_serializers.errors}, status=status.HTTP_400_BAD_REQUEST)