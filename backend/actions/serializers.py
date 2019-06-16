from rest_framework import serializers
from .models import Ratings
        

class ActionSerializer(serializers.Serializer):
    game = serializers.IntegerField()
    user = serializers.IntegerField()
    action = serializers.CharField(max_length=16)
    value = serializers.BooleanField()
    

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ('game', 'user', 'rating')
        