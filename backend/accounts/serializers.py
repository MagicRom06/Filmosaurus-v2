from .models import Watchlist
from rest_framework import serializers

class WatchlistAddSerializer(serializers.Serializer):
    movie_id = serializers.IntegerField()


class WatchlistCheckinDbSerializer(serializers.Serializer):
    saved = serializers.BooleanField()


class WatchlistListSerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            'id',
            'movie_id',
            'user_id',
        )
        model = Watchlist
