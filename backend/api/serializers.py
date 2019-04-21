from .models import Game
from rest_framework import serializers


class GameSerializer(serializers.Serializer):
    igdb = serializers.IntegerField()
    name = serializers.CharField()

    def create(self, validated_data):
        return Game.objects.create(**validated_data)    
