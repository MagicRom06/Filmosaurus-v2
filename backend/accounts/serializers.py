from .models import Watchlist
from rest_framework import serializers

class WatchlistAddSerializer(serializers.Serializer):
    movie_id = serializers.IntegerField()


class WatchlistCheckinDbSerializer(serializers.Serializer):
    saved = serializers.BooleanField()


class WatchlistListSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='movie.title')
    movie_id = serializers.CharField(source='movie.id')
    year = serializers.CharField(source='movie.year')

    class Meta:
        fields = (
            'id',
            'movie_id',
            'title',
            'year',
            'seen',
            'viewed_date',
            'saved_date'
        )
        model = Watchlist
