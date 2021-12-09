from django.contrib import admin
from django.urls import path
from .views import AddToWatchlistView, MovieInWatchlist, WatchlistListView

urlpatterns = [
    path('watchlist/add', AddToWatchlistView.as_view()),
    path('watchlist/movie/check', MovieInWatchlist.as_view()),
    path('watchlist/list', WatchlistListView.as_view(),)
]
