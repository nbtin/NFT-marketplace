from django.urls import path, include
from account import api_handler
from .views import (
    GetNFTs,
    ProcessTransaction,
    CreateNFT,
)

urlpatterns = [
    path("transaction", ProcessTransaction.as_view()),
    path("create", CreateNFT.as_view()),
]