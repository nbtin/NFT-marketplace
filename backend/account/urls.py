from django.urls import path, include
from account import api_handler
from .views import (
    Register,
    Login,
    Logout,
    GetWalletData,
    GetUserData
)

urlpatterns = [
    path("register", Register.as_view()),
    path("login", Login.as_view()),
    path("logout", Logout.as_view()),
    path("getwallet", GetWalletData.as_view()),
    path("getuser", GetUserData.as_view()),
]