import requests
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import GameSerializer
from .fields import fields, search_fields

@api_view()
def get_game(request, guid):
    params = {'field_list': fields}
    headers= {'user-agent': 'LetterboxdForVideogames'}
    url = settings.GB_GAME_URL.format(guid=guid)
    r = requests.get(url=url, params=params, headers=headers)
    
    return Response(r)
    
@api_view(['GET', 'POST'])
def log(request):
    if request.method == 'POST':
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def search_game(request, name):
    params = {'resources': 'game', 'field_list': search_fields, 'query': name}
    headers= {'user-agent': 'LetterboxdForVideogames'}
    url = settings.GB_URL.format(endpoint='search')
    r = requests.get(url=url, params=params, headers=headers) 
    return Response(r.json())


@api_view(['GET'])
def get_screenshots(request, guid):
    url = settings.GB_IMAGES_URL.format(guid=guid, tag='Screenshots')
    headers= {'user-agent': 'LetterboxdForVideogames'}
    r = requests.get(url=url, headers=headers)   

    return Response(r.json())
