from rest_framework import serializers

from .models import Movie


class MovieSearchSerializer(serializers.ModelSerializer):

    directors = serializers.StringRelatedField(many=True)
    countries = serializers.StringRelatedField(many=True)

    class Meta:
        fields = (
            'id',
            'title',
            'year',
            'directors',
            'countries'
        )
        model = Movie


class MovieDetailSerializer(serializers.ModelSerializer):

    directors = serializers.StringRelatedField(many=True)
    countries = serializers.StringRelatedField(many=True)
    casts = serializers.StringRelatedField(many=True)
    categories = serializers.StringRelatedField(many=True)

    class Meta:
        fields = (
            'id',
            'title',
            'year',
            'categories',
            'directors',
            'casts',
            'plot',
            'countries'
        )
        model = Movie


class MovieGetImageSerializer(serializers.Serializer):
    image = serializers.CharField()
