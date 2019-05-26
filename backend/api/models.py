from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Game(models.Model):
    gb = models.CharField(max_length=16)
    name = models.CharField(max_length=255, default='default')

    def __str__(self):
        return '%s - %s' % (self.gb, self.name)


class Ratings(models.Model):
    game = models.ForeignKey('Game', on_delete=models.CASCADE)
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
    rating = models.IntegerField(null=True,
                                 validators=[MinValueValidator(0), MaxValueValidator(10)])

    def __str__(self):
        return '%s - %s - %s' % (self.user, self.game, self.rating)

    class Meta:
        unique_together = ['game', 'user']
