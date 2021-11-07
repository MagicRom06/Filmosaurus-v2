from django.test import TestCase

from .models import Category, Country, Movie, Person


class MoviesTest(TestCase):

    def setUp(self):

        self.movie = Movie.objects.create(
            title='test title',
            year=1900,
            plot='test plot'
        )
        self.movie.categories.add(
            Category.objects.create(name="test category"))
        self.movie.countries.add(
            Country.objects.create(name="test country"))
        self.movie.directors.add(
            Person.objects.create(name="test director"))
        self.movie.casts.add(
            Person.objects.create(name="test cast"))

    def test_movie_listing(self):
        """
        testing new movie creation and data saved
        """
        self.assertEqual(f"{self.movie.title}", 'test title')
        self.assertEqual(self.movie.year, 1900)
        self.assertEqual(f"{self.movie.plot}", 'test plot')
        self.assertEqual(
            f"{self.movie.categories.all()[0].name}",
            'test category'
        )
        self.assertEqual(
            f"{self.movie.countries.all()[0].name}",
            'test country'
        )
        self.assertEqual(
            f"{self.movie.directors.all()[0].name}",
            'test director'
        )
        self.assertEqual(
            f"{self.movie.casts.all()[0].name}",
            'test cast'
        )
