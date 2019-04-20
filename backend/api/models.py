from django.db import models

# Create your models here.
class Game(models.Model):
    igdb = models.IntegerField()
    