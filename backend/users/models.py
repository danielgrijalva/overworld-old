from django.contrib.auth.models import AbstractUser
from django.db import models
from api.models import Game


class CustomUser(AbstractUser):
    played = models.ManyToManyField(Game, related_name='played')
    liked = models.ManyToManyField(Game, related_name='liked')
    backlog = models.ManyToManyField(Game, related_name='backlog')
    wishlist = models.ManyToManyField(Game, related_name='wishlist')

    def __str__(self):
        return self.username
