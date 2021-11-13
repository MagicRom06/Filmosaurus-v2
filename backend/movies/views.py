from django.db.models import Q
from rest_framework import generics
from django.http import Http404
from rest_framework.response import Response
from imdb import IMDb

from .models import Movie
from .serializers import \
    MovieDetailSerializer, \
    MovieSearchSerializer, \
    MovieGetImageSerializer

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


class MovieGetImage(generics.ListCreateAPIView):
    serializer_class = MovieGetImageSerializer

    def get(self, request):
        results = []
        i = 0
        ia = IMDb()
        movie = self.request.query_params.get('movie')
        year = self.request.query_params.get('year')
        search = ia.search_movie(movie)
        while i < len(search):
            if 'year' in search[i].keys():
                if str(search[i]['year']) == year \
                       and search[i]['kind'] == 'movie':
                    results.append((search[i]['full-size cover url']))
            i += 1
        return Response({'image': results[0]})
