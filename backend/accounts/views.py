from rest_framework.response import Response
from .serializers import WatchlistAddSerializer, \
                         WatchlistCheckinDbSerializer,\
                         WatchlistListSerializer,\
                         WatchlistUpdateSerializer
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Watchlist
from movies.models import Movie

class AddToWatchlistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = WatchlistAddSerializer(data=request.data)
        user = get_user_model().objects.get(id=self.request.user.id)
        if serializer.is_valid():
            try:
                movie = Movie.objects.get(id=request.data['movie_id'])
                add = Watchlist.objects.create(movie=movie, user=user)
                add.save()
            except Exception as e:
                return Response(
                    {
                        "success": False,
                        "error": str(e)
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                return Response(
                    {
                        "movie": movie.title, "success": True
                    },
                    status=status.HTTP_201_CREATED
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MovieInWatchlist(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WatchlistCheckinDbSerializer

    def get(self, request):
        user = get_user_model().objects.get(id=self.request.user.id)
        movie_id = self.request.query_params.get('movie_id')
        if Watchlist.objects.filter(user_id=user.id, movie_id=movie_id).exists():
            return Response({'saved': True})
        else:
            return Response({'saved': False}) 


class WatchlistListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WatchlistListSerializer
    pagination_class = None

    def get_queryset(self):
        return Watchlist.objects.filter(user_id=self.request.user.id)


class WatchlistUpdateSeenView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        serializer = WatchlistUpdateSerializer(data=request.data)
        user = get_user_model().objects.get(id=self.request.user.id)
        if serializer.is_valid():
            try:
                item = Watchlist.objects.get(id=request.data['watchlist_id'], user_id=user.id)
                item.seen = True
                item.save()
            except Exception as e:
                return Response({'update': False, 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'update': True}, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
