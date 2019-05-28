import requests
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from users.serializers import UserSerializer
from users.models import CustomUser
from .serializers import GameSerializer, RatingSerializer
from .fields import game_fields, search_fields, popular_fields, backdrop_fields
from .models import Game, Ratings


@api_view(['GET'])
def get_game(request, guid):
    data = f'fields {game_fields}; where id={guid};'
    headers = {'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers)
    
    return Response(r.json())


@api_view(['GET'])
def search_game(request, name):
    data = f'fields {search_fields}; search "{name}";'
    headers = {'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers)

    return Response(r.json())


@api_view(['GET'])
def get_popular_games(request):
    data = f'fields {popular_fields}; sort popularity desc; limit 7;'
    headers = {'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers)

    return Response(r.json())


@api_view(['GET'])
def get_backdrop(request, guid):
    data = f'fields {backdrop_fields}; where id={guid};'
    headers = {'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers)
    
    return Response(r.json())



class Actions(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            gb = request.GET['gb']
            name = request.GET['name']
            game = Game.objects.get(gb=gb, name=name)
        except ObjectDoesNotExist:
            return Response([])

        user = CustomUser.objects.get(id=request.user.id)
        actions = {}
        actions['played'] = True if game in user.played.all() else False
        actions['liked'] = True if game in user.liked.all() else False
        actions['backlog'] = True if game in user.backlog.all() else False
        actions['wishlist'] = True if game in user.wishlist.all() else False

        return Response(actions)


class Log(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game, created = Game.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)

        # toggle played value
        if game not in user.played.all():
            user.played.add(game)
        else:
            user.played.remove(game)

        serializer = GameSerializer(game).data

        # if the game you just logged was in your backlog, remove it
        if game in user.backlog.all():
            user.backlog.remove(game)
            serializer['removedFromBacklog'] = True

        return Response(serializer)


class Like(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game, created = Game.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)

        # toggle liked value
        if game not in user.liked.all():
            user.liked.add(game)
        else:
            user.liked.remove(game)

        serializer = GameSerializer(game).data

        return Response(serializer)


class Backlog(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game, created = Game.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)

        # toggle backlog value
        if game not in user.backlog.all():
            user.backlog.add(game)
        else:
            user.backlog.remove(game)

        serializer = GameSerializer(game).data

        return Response(serializer)


class Wishlist(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game, created = Game.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)

        # toggle wishlist value
        if game not in user.wishlist.all():
            user.wishlist.add(game)
        else:
            user.wishlist.remove(game)

        serializer = GameSerializer(game).data

        return Response(serializer)


class Rate(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            gb = request.GET['game']
            game = Game.objects.get(gb=gb)
            user = CustomUser.objects.get(id=request.user.id)
            r = Ratings.objects.get(game=game, user=user)
        except ObjectDoesNotExist:
            return Response([])

        serializer = RatingSerializer(r)

        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        rating = request.data['rating']
        gb = request.data['game']
        game, _ = Game.objects.get_or_create(gb=gb)
        user = CustomUser.objects.get(id=request.user.id)

        r, _ = Ratings.objects.get_or_create(game=game, user=user)
        r.rating = rating
        r.save()

        serializer = RatingSerializer(r).data

        return Response(serializer)
