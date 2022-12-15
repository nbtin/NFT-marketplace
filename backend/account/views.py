from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.models import User, Wallet
from account.serializers import UserSerializer, WalletSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser



# Create your views here.

class Register(APIView):
    def post(self, request, *args, **kwargs):
        user_data=JSONParser().parse(request)
        wallet_serializers=WalletSerializer(data={'wallet_balance': 0})
        if wallet_serializers.is_valid():
            wallet_serializers.save()
        else:
            return Response({"status": "error", "data": wallet_serializers.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        user_data.update({'wallet_address': wallet_serializers.data['wallet_id']})
        user_serializers=UserSerializer(data=user_data)

        if user_serializers.is_valid():
        
            user_data.update({'wallet_address': wallet_serializers.data['wallet_id']})
            if user_serializers.is_valid():
                user_serializers.save()
                return Response({"status": "success", "data": user_serializers.data}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "error", "data": user_serializers.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # modify error message when user is invalid --> trim the 'wallet_address' message
            print(type(user_serializers.errors))
            error_response = {}
            error_response.update(user_serializers.errors)
            if 'wallet_address' in error_response: 
                del error_response['wallet_address']
            return Response({"status": "error", "data": error_response}, status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    def post(self, request, *args, **kwargs):
        try:
            user_data=JSONParser().parse(request)        
            user_serializers=UserSerializer(data=user_data)

            temp_serializers={}
            temp_serializers.update(user_serializers.initial_data)
            
            for user in User.objects.all():
                if user.isAuthenticated(user_data['email'], user_data['password']):
                    temp_serializers['wallet_address'] = str(user.getWalletAddress())
                    temp_serializers['user_id'] = user.user_id
                    temp_serializers['username'] = user.username
                    return Response({"status": "Logged in successfully", "data": temp_serializers}, status=status.HTTP_200_OK)
            
            return Response({"status": "Failed to log in", "data": user_data}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(e)
            return Response({"status": "Failed to log in", "data": user_data}, status=status.HTTP_400_BAD_REQUEST)

class Logout(APIView):
    def post(self, request, *args, **kwargs):
        response_data = {}
        try:
            sessionid = request.data.get('sessionid')
            userid = request.data.get('userid')
            print(sessionid, userid)
            # TODO: logout user
        except Exception as e:
            print(e)
            return Response({
                'Status': 'Failed', 
                'Error': e
                }, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(response_data, status = status.HTTP_200_OK)

class GetWalletData(APIView):
    def post(self, request, *args, **kwargs):
        wallet_data=JSONParser().parse(request)        
        wallet_id = wallet_data['wallet_id']
        try:
            wallet_balance, date_created = Wallet.objects.get(wallet_id=wallet_id).getWalletData()
            response_data = {}
            response_data['wallet_balance'] = wallet_balance
            response_data['date_created'] = date_created
            return Response({"status": "Got wallet data successfully!", "data": response_data}, status=status.HTTP_200_OK)
        except Wallet.DoesNotExist:
            return Response({"status": "error", "data": "This wallet does not exist!"}, status=status.HTTP_400_BAD_REQUEST)

        