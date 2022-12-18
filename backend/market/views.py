from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.models import User, Wallet
from market.models import NFT, Transaction
from market.serializers import NFTSerializer, TransactionSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser


# Create your views here.
def getAllNFTs():
    nfts = list(NFT.objects.all().values())
    return nfts

def getUserNFTs(user_id):
    nfts = list(NFT.objects.filter(owner_id=user_id).values())
    return nfts 

def getSearchedNFTs(search):
    nfts = list(NFT.objects.filter(title__contains=search).values())
    return nfts

def updateBalance(seller_id, buyer_id, token_id):
    seller = User.objects.get(user_id=seller_id.user_id)
    buyer = User.objects.get(user_id=buyer_id.user_id)
    nfts = NFT.objects.get(token_id = token_id.token_id)
    creator = nfts.creator_id
    creator_fee = nfts.creator_fee
    value = nfts.price
    if buyer and creator and seller:
        buyer.updateBalance(-float(value))
        creator.updateBalance(float(creator_fee) * float(value))
        seller.updateBalance(float(value) * (1 - creator_fee))
        return True
    return False

class GetUserNFTs(APIView):
    def get(self, request, *args, **kwargs):
        try:
            username = kwargs.get('username')
            user_id = User.objects.filter(username=username).values('user_id').first()['user_id']
            ans = getUserNFTs(user_id)
            return Response({"status": "success", "data": ans}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"status": "error", "data": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

class GetNFTs(APIView):
    def get(self, request, *args, **kwargs):
        try:
            op = request.query_params.get('type')
            if op == 'all':
                ans = getAllNFTs()
                return Response({"status": "success", "data": ans}, status=status.HTTP_200_OK)
            elif op == 'search':
                query = request.query_params.get('query')
                if query == None:
                    query = ''
                ans = getSearchedNFTs(query)
                return Response({"status": "success", "data": ans}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "error", "data": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)
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

class ProcessTransaction(APIView):
    def post(self, request, *args, **kwargs):
        transaction_data=JSONParser().parse(request)
        transaction_serializers=TransactionSerializer(data=transaction_data)
        if transaction_serializers.is_valid():
            seller = User.objects.get(user_id = transaction_data['seller_id'])
            buyer = User.objects.get(user_id = transaction_data['buyer_id'])
            token = NFT.objects.get(token_id = transaction_data['token_id'])
            
            if token.isForSale(): # kiểm tra token có đang mở bán hay không
                if token.isOwner(transaction_data['seller_id']): # kiểm tra seller trong yêu cầu gửi tới có phải là chủ thực sự của NFT hay không
                    if updateBalance(seller, buyer, token): # update số dư của seller, buyer và creator.
                        # trừ đi phần tiền thu lại của người bán 1 lượng = transaction_fee + gas_price
                        seller.updateBalance(-int(transaction_data['transaction_fee']) * 0.01 - float(transaction_data['gas_price']))
                        # đổi chủ của NFT thành người mua
                        token.changeOwner(buyer)
                        #update status cho transaction
                        transaction_data.update({'status': 1})
                        transaction_serializers=TransactionSerializer(data=transaction_data)
                        if transaction_serializers.is_valid(): transaction_serializers.save()
                        # cập nhật lịch sử mua bán (transaction_id)
                        token.updateHistory(transaction_serializers.data['transaction_id'])
                        return Response({"status": "success", "data": transaction_serializers.data}, status=status.HTTP_200_OK)
                    else: # update số dư thất bại
                        #update status cho transaction
                        transaction_data.update({'status': -1})
                        transaction_serializers=TransactionSerializer(data=transaction_data)
                        if transaction_serializers.is_valid(): transaction_serializers.save()
                        return Response({"status": "error", "data": transaction_serializers.errors}, status=status.HTTP_400_BAD_REQUEST)
                else: # seller không phải là chủ sở hữu của NFT
                    #update status cho transaction
                    transaction_data.update({'status': -1})
                    transaction_serializers=TransactionSerializer(data=transaction_data)
                    if transaction_serializers.is_valid(): transaction_serializers.save()
                    return Response({"status": "error", "data": "Can't sell NFT that does not belong to you!"}, status=status.HTTP_400_BAD_REQUEST)
            else:  # NFT đang không mở bán
                transaction_data.update({'status': -1})
                transaction_serializers=TransactionSerializer(data=transaction_data)
                if transaction_serializers.is_valid(): transaction_serializers.save()
                return Response({"status": "error", "data": "This NFT is not for sale!"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"status": "error", "data": transaction_serializers.errors}, status=status.HTTP_400_BAD_REQUEST)

