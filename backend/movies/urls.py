from django.urls import path
from .views import MoviesList, MovieDetail

urlpatterns = [
    path('movies', MoviesList.as_view()),
    path('movie/<int:pk>', MovieDetail.as_view()),
]
