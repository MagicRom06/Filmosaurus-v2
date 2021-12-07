from rest_framework.response import Response
from .serializers import WatchlistAddSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Watchlist
from movies.models import Movie

class AddToWatchlistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = WatchlistAddSerializer(data=request.data)
        movie = Movie.objects.get(id=request.data['movie_id'])
        user = get_user_model().objects.get(id=self.request.user.id)
        if serializer.is_valid():
            add = Watchlist.objects.create(movie=movie, user=user)
            add.save()
            return Response(movie.id, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
