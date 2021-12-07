from django.contrib import admin
from django.urls import path
from .views import AddToWatchlistView

urlpatterns = [
    path('watchlist/add', AddToWatchlistView.as_view()),
]
