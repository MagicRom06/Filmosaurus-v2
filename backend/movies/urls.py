from django.urls import path

from .views import MovieDetail, MoviesList

urlpatterns = [
    path('search', MoviesList.as_view()),
    path('movie/<int:pk>', MovieDetail.as_view()),
]
