from django.contrib.auth.models import AbstractUser
from django.db import models
from games.models import Game


class CustomUser(AbstractUser):
    bio = models.CharField(max_length=255, null=True)
    twitter = models.CharField(max_length=15, null=True)
    location = models.CharField(max_length=50, null=True)
    following = models.ManyToManyField('self', symmetrical=False, related_name='fing')
    followers = models.ManyToManyField('self', symmetrical=False, related_name='fers')
    played = models.ManyToManyField(Game, related_name='played')
    liked = models.ManyToManyField(Game, related_name='liked')
    backlog = models.ManyToManyField(Game, related_name='backlog')
    wishlist = models.ManyToManyField(Game, related_name='wishlist')
    favorites = models.ManyToManyField(Game, related_name='favorites')
    
    def __str__(self):
        return self.username
