from rest_framework import serializers
from .models import Movie


class MovieSearchSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'year',
            'categories',
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
