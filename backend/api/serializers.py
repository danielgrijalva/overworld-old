from .models import Game
from rest_framework import serializers


class GetGameSerializer(serializers.Serializer):
    name = serializers.CharField()
    category = serializers.IntegerField()
