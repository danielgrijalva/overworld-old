from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from libgravatar import Gravatar
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'gravatar')


class ProfileSerializer(serializers.ModelSerializer):
    following = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )

    followers = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )

    class Meta:
        model = CustomUser
        depth = 1
        fields = (
            'id',
            'username',
            'email',
            'bio',
            'gravatar',
            'location',
            'twitter',
            'played',
            'liked',
            'backlog',
            'wishlist',
            'following',
            'followers',
        )


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=8)
    email = serializers.EmailField(
                validators=[UniqueValidator(queryset=CustomUser.objects.all())])

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password')   
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        g = Gravatar(validated_data['email'])
        gravatar = g.get_image(size=120, default='retro', use_ssl=True)
        user = CustomUser.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
            gravatar=gravatar
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect username/password.')
