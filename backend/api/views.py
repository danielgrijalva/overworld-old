import requests
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from users.serializers import UserSerializer
from users.models import CustomUser
from .serializers import GameSerializer
from .fields import fields, search_fields
from .models import Game


@api_view()
def get_game(request, guid):
    params = {'field_list': fields}
    headers = {'user-agent': 'LetterboxdForVideogames'}
    url = settings.GB_GAME_URL.format(guid=guid)
    r = requests.get(url=url, params=params, headers=headers)

    return Response(r.json())


@api_view(['GET'])
def search_game(request, name):
    params = {'resources': 'game', 'field_list': search_fields, 'query': name}
    headers = {'user-agent': 'LetterboxdForVideogames'}
    url = settings.GB_URL.format(endpoint='search')
    r = requests.get(url=url, params=params, headers=headers)
    return Response(r.json())


@api_view(['GET'])
def get_screenshots(request, guid):
    url = settings.GB_IMAGES_URL.format(guid=guid, tag='Screenshots')
    headers = {'user-agent': 'LetterboxdForVideogames'}
    r = requests.get(url=url, headers=headers)

    return Response(r.json())


@api_view(['GET'])
def get_game_country(request, publisher_id):
    company_id = f'3010-{publisher_id}'
    url = settings.GB_COMPANY_URL.format(guid=company_id, endpoint='company')
    headers = {'user-agent': 'LetterboxdForVideogames'}
    params = {'field_list': 'location_country'}
    r = requests.get(url=url, params=params, headers=headers)

    return Response(r.json())


@api_view()
def get_popular_games(request):
    data = 'fields popularity,name,cover; sort popularity desc; limit 6;'
    headers = {'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers)

    return Response(r.json())


@api_view()
def get_igdb_cover(request, cover_id):
    data = f'fields image_id; where id={cover_id};'
    headers = {'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='covers')
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

        user.played.add(game)
        serializer = GameSerializer(game).data

        # if the game you just logged was in your backlog, remove it
        if game in user.backlog.all():
            user.backlog.remove(game)
            serializer['removedFromBacklog'] = True
    
        print(serializer)

        return Response(serializer)


class Unlog(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game = Game.objects.get(**request.data)
        user = CustomUser.objects.get(id=request.user.id)
        user.played.remove(game)
        serializer = GameSerializer(game).data

        return Response(serializer)


class Like(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game, created = Game.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)
        user.liked.add(game)
        serializer = GameSerializer(game).data

        return Response(serializer)


class Unlike(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game = Game.objects.get(**request.data)
        user = CustomUser.objects.get(id=request.user.id)
        user.liked.remove(game)
        serializer = GameSerializer(game).data

        return Response(serializer)


class Backlog(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game, created = Game.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)
        user.backlog.add(game)
        serializer = GameSerializer(game).data

        return Response(serializer)


class RemoveBacklog(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game = Game.objects.get(**request.data)
        user = CustomUser.objects.get(id=request.user.id)
        user.backlog.remove(game)
        serializer = GameSerializer(game).data

        return Response(serializer)


class Wishlist(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game, created = Game.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)
        user.wishlist.add(game)
        serializer = GameSerializer(game).data

        return Response(serializer)


class RemoveWishlist(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game = Game.objects.get(**request.data)
        user = CustomUser.objects.get(id=request.user.id)
        user.wishlist.remove(game)
        serializer = GameSerializer(game).data

        return Response(serializer)
