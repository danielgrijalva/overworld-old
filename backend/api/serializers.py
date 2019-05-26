from .models import Game
from rest_framework import serializers
from .models import Game, Ratings


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('gb', 'name',)


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ('game', 'user', 'rating')
