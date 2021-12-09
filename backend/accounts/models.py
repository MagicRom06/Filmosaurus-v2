from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.deletion import CASCADE
from movies.models import Movie

# Create your models here.

class Watchlist(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=CASCADE,
        related_name='current_user',
    )
    movie = models.ForeignKey(
        Movie,
        on_delete=CASCADE,
        related_name='user_movie',
    )
    seen = models.BooleanField(default=False)
    viewed_date = models.DateTimeField(null=True, blank=True)
    saved_date = models.DateTimeField(auto_now_add=True)
