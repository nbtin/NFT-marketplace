from django.urls import path, include, re_path
from account import api_handler
from .views import (
    GetUserNFTs,
    ProcessTransaction,
    CreateNFT,
    GetNFTs
)


urlpatterns = [
    path("transaction", ProcessTransaction.as_view()),
    path("create", CreateNFT.as_view()),
    path('collection/<str:username>', GetUserNFTs.as_view()),
    path('collection', GetNFTs.as_view())
]

