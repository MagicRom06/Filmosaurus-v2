from django.db.models import Q
from rest_framework import generics
from django.http import Http404

from .models import Movie
from .serializers import MovieDetailSerializer, MovieSearchSerializer

# Create your views here.


class MoviesList(generics.ListCreateAPIView):
    serializer_class = MovieSearchSerializer

    def get_queryset(self):
        search = self.request.query_params.get('query')
        if search:
            return Movie.objects.filter(
                Q(title__icontains=search.capitalize())
            )
        elif not search or search is None:
            raise Http404("Search Not Found") 


class MovieDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieDetailSerializer
