from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.models import User, Wallet
from market.models import NFT, Transaction, Follow
from market.serializers import NFTSerializer, TransactionSerializer, FollowSerializer
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

def getNFTforSale():
    nfts = list(NFT.objects.filter(for_sale=True).values())
    return nfts

def updateBalance(seller_id, buyer_id, token_id):
    seller = User.objects.get(user_id=seller_id.user_id)
    buyer = User.objects.get(user_id=buyer_id.user_id)
    nfts = NFT.objects.get(token_id = token_id.token_id)
    creator = nfts.creator_id
    creator_fee = nfts.creator_fee
    value = nfts.price
    if buyer and creator and seller:
        check_buyer = buyer.isAbleToUpdateBalance(-float(value))
        check_creator = creator.isAbleToUpdateBalance(float(creator_fee) * float(value))
        check_seller = seller.isAbleToUpdateBalance(float(value) * (1 - creator_fee))
        if check_buyer and check_creator and check_seller:
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
            elif op == 'market':
                ans = getNFTforSale()
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
                        return Response({"status": "error", "data": "The customer does not have enough money in their wallet to complete the transaction!"}, status=status.HTTP_400_BAD_REQUEST)
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

class GetTransactionData(APIView):
    def post(self, request, *args, **kwargs):
        input_data=JSONParser().parse(request)        
        transaction_id = input_data['transaction_id']
        try:
            transaction_status, time_stamp, transaction_fee, gas_price, buyer_id, seller_id, token_id = Transaction.objects.get(transaction_id=transaction_id).getTransactionData()
            response_data = {}
            response_data['transaction_status'] = transaction_status
            response_data['time_stamp'] = time_stamp
            response_data['transaction_fee'] = transaction_fee
            response_data['gas_price'] = gas_price
            response_data['buyer_id'] = buyer_id
            response_data['seller_id'] = seller_id
            response_data['token_id'] = token_id
            return Response({"status": "Got transation data successfully!", "data": response_data}, status=status.HTTP_200_OK)
        except Transaction.DoesNotExist:
            return Response({"status": "error", "data": "This transaction does not exist!"}, status=status.HTTP_400_BAD_REQUEST)

class PostNFTforSale(APIView):
    def post(self, request, *args, **kwargs):
        input_data=JSONParser().parse(request)        
        token_id = input_data['token_id']
        try:
            nft = NFT.objects.get(token_id = token_id)
            nft.sale()
            return Response({"status": "success", "data": "This NFT has been successfully posted for sale!"}, status=status.HTTP_200_OK)
        except NFT.DoesNotExist:
            return Response({"status": "error", "data": "This token does not exist!"}, status=status.HTTP_400_BAD_REQUEST)


class FollowNFT(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = JSONParser().parse(request)
            user_id = data['user_id']
            nft_id = data['nft_id']
            if User.objects.filter(user_id=user_id).exists() and NFT.objects.filter(token_id=nft_id).exists():
                follow_serializer = FollowSerializer(data=data)
                if follow_serializer.is_valid():
                    follow_serializer.save()
                return Response({"status": "success", "data": "Follow successfully!"}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "error", "data": "Invalid user or nft"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"status": "error", "data": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        try:
            data = JSONParser().parse(request)
            user_id = data['user_id']
            nft_id = data['nft_id']
            if User.objects.filter(user_id=user_id).exists() and NFT.objects.filter(token_id=nft_id).exists():
                follow = Follow.objects.get(user_id=user_id, nft_id=nft_id)
                follow.delete()
                return Response({"status": "success", "data": "Unfollow successfully!"}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "error", "data": "Invalid user or nft"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"status": "error", "data": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)