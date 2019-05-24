from django.db import models


class Game(models.Model):
    gb = models.CharField(max_length=16)
    name = models.CharField(max_length=255, default='default')
    