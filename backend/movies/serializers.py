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
