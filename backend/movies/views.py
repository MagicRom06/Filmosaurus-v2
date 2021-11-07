from rest_framework import generics
from django.db.models import Q

from .models import Movie
from .serializers import MovieSearchSerializer, MovieDetailSerializer

# Create your views here.


class MoviesList(generics.ListCreateAPIView):
    serializer_class = MovieSearchSerializer

    def get_queryset(self):
        search = self.request.query_params.get('search')
        return Movie.objects.filter(
            Q(title__icontains=search.capitalize())
        )


class MovieDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieDetailSerializer
