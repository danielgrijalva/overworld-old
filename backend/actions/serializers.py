from rest_framework import serializers
from games.serializers import GameSerializer
from .models import Ratings, Journal
        

class ActionSerializer(serializers.Serializer):
    game = serializers.IntegerField()
    user = serializers.IntegerField()
    action = serializers.CharField(max_length=16)
    value = serializers.BooleanField()
    

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ('game', 'user', 'rating')


class JournalSerializer(serializers.ModelSerializer):
    game = GameSerializer(read_only=True)
    class Meta:
        model = Journal
        fields = '__all__'
        