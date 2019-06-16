from django.db import models


class Game(models.Model):
    igdb = models.CharField(max_length=16)
    name = models.CharField(max_length=255, default='default')

    def __str__(self):
        return '%s - %s' % (self.igdb, self.name)
