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
        user = get_user_model().objects.get(id=self.request.user.id)
        if serializer.is_valid():
            try:
                movie = Movie.objects.get(id=request.data['movie_id'])
                add = Watchlist.objects.create(movie=movie, user=user)
                add.save()
            except Exception as e:
                print(e)
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
