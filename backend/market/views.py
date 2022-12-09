from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from market.models import NFT
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser



# Create your views here.
def getAllNFTs():
    nfts = NFT.objects.all()
    return nfts

def getUserNFTs(user_id):
    nfts = NFT.objects.filter(owner_id=user_id)
    return nfts

def getSearchedNFTs(search):
    nfts = NFT.objects.filter(title__contains=search)
    return nfts

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
        except:
            return Response({"status": "error", "data": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)