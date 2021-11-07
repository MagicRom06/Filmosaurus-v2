from django.urls import path

from .views import MovieDetail, MoviesList

urlpatterns = [
    path('movies', MoviesList.as_view()),
    path('movie/<int:pk>', MovieDetail.as_view()),
]
