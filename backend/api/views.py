from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


class Register(APIView):
    def post(self, request, *args, **kwargs):
        try:
            usernmae, fullname, email, phone, password = [request.data.get(_) for _ in ['username', 'fullname', 'email', 'phone', 'password']]
            print(usernmae, fullname, email, phone, password)
            # TODO: register user
        except Exception as e:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({}, status = status.HTTP_200_OK) 
        
class Login(APIView):
    def post(self, request, *args, **kwargs):
        response_data = {}
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            response_data = {} # TODO: get the data from the database
        except Exception as e:
            return Response({
                'Status': 'Failed', 
                'Error': e
                }, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(response_data, status = status.HTTP_200_OK)


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