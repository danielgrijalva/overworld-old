from django.db import models


class Game(models.Model):
    igdb = models.IntegerField()
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255)
    
    def __str__(self):
        return '%s - %s' % (self.igdb, self.name)
