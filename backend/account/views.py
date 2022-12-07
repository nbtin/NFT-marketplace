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
        user_serializers=UserSerializer(data=user_data)
        
        if user_serializers.is_valid():
            #TODO: tạo ví trước khi tạo tài khoản (bước save), lấy wallet_id của ví cập nhật cho user vừa tạo.
            user_serializers.save()
            return Response({"status": "success", "data": user_serializers.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": user_serializers.errors}, status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    def post(self, request, *args, **kwargs):
        user_data=JSONParser().parse(request)        
        user_serializers=UserSerializer(data=user_data)
        
        if user_serializers.is_valid():
            temp_serializers={}
            temp_serializers.update(user_serializers.data)
            for user in User.objects.all():
                if user.isAuthenticated(user_data['email'], user_data['password']):
                    temp_serializers['wallet_address'] = str(user.getWalletAddress())
                    print(type(temp_serializers))
                    return Response({"status": "Logged in successfully", "data": temp_serializers}, status=status.HTTP_200_OK)
            
        return Response({"status": "Failed to log in", "data": user_serializers.errors}, status=status.HTTP_400_BAD_REQUEST)


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