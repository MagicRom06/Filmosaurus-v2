from rest_framework import serializers

class WatchlistAddSerializer(serializers.Serializer):
    movie_id = serializers.IntegerField()

class WatchlistCheckinDbSerializer(serializers.Serializer):
    saved = serializers.BooleanField()
