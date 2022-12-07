# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.parsers import JSONParser
# from django.http.response import JsonResponse

# from account.models import User, Wallet
# from account.serializers import UserSerializer, WalletSerializer

# from django.core.files.storage import default_storage


# @csrf_exempt
# def RegisterAPI(request,id=0):
#     if request.method=='POST':
#         user_data=JSONParser().parse(request)
#         user_serializers=UserSerializer(data=user_data)
#         # if user_serializers.is_valid():
#         user_serializers.save()
#         return "Added Successfully"
#         return "Failed to Add"

# @csrf_exempt
# def userApi(request,id=0):
#     if request.method=='GET':
#         user = User.objects.all()
#         user_serializers=UserSerializer(user,many=True)
#         return JsonResponse(user_serializers.data,safe=False)
#     elif request.method=='POST':
#         user_data=JSONParser().parse(request)
#         user_serializers=UserSerializer(data=user_data)
#         if user_serializers.is_valid():
#             user_serializers.save()
#             return "Added Successfully"
#         return "Failed to Add"

#     # LOGIN :(
#     elif request.method == 'OPTIONS':
#         user_data=JSONParser().parse(request)

#         for user in User.objects.all():
#             if user.isAuthenticated(user_data['email'], user_data['password']):
#                 # check = not check
#                 return "Logged in Successfully"
        
#         return "Failed to logging in"
            
        
#     elif request.method=='PUT':
#         user_data=JSONParser().parse(request)
#         user=User.objects.get(user_id=user_data['user_id'])
#         user_serializers=UserSerializer(user,data=user_data)
#         if user_serializers.is_valid():
#             user_serializers.save()
#             return JsonResponse("Updated Successfully",safe=False)
#         return JsonResponse("Failed to Update",safe=False)
#     elif request.method=='DELETE':
#         user=User.objects.get(userId=id)
#         user.delete()
#         return JsonResponse("Deleted Successfully",safe=False)

# @csrf_exempt
# def walletApi(request,id=0):
#     if request.method=='GET':
#         wallet = Wallet.objects.all()
#         wallet_serializer=WalletSerializer(wallet,many=True)
#         return JsonResponse(wallet_serializer.data,safe=False)
#     elif request.method=='POST':
#         wallet_data=JSONParser().parse(request)
#         wallet_serializer=WalletSerializer(data=wallet_data)
#         if wallet_serializer.is_valid():
#             wallet_serializer.save()
#             return JsonResponse("Added Successfully",safe=False)
#         return JsonResponse("Failed to Add",safe=False)
#     elif request.method=='PUT':
#         wallet_data=JSONParser().parse(request)
#         wallet=Wallet.objects.get(wallet_id=wallet_data['wallet_id'])
#         wallet_serializer=WalletSerializer(wallet,data=wallet_data)
#         if wallet_serializer.is_valid():
#             wallet_serializer.save()
#             return JsonResponse("Updated Successfully",safe=False)
#         return JsonResponse("Failed to Update")
#     elif request.method=='DELETE':
#         wallet=Wallet.objects.get(EmployeeId=id)
#         wallet.delete()
#         return JsonResponse("Deleted Successfully",safe=False)