from django.contrib.auth.models import AbstractUser
from django.db import models
from api.models import Game

class CustomUser(AbstractUser):
    games = models.ManyToManyField(Game)

    def __str__(self):
        return self.username
        