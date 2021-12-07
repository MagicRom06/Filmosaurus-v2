from rest_framework.response import Response
from .serializers import WatchlistAddSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class AddToWatchlistView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = WatchlistAddSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
