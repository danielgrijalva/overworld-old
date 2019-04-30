import requests
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import GameSerializer
from .fields import fields
from pprint import pprint

@api_view()
def get_game(request, igdb):
    data = f'fields {fields}; where id={igdb};'
    headers={'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers).json()

    dev = get_developer(r[0]['id'])[0]
    r[0]['developer'] = dev

    cover = get_cover(r[0]['cover'])[0]
    r[0]['cover'] = cover
    
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
    params = {'search': name, 'fields': 'name,slug'}
    headers={'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, params=params, headers=headers) 

    return Response(r.json())

# @api_view(['GET'])
def get_cover(cover_id):
    data = f'fields: image_id,width,height; where id={cover_id};'
    headers={'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='covers')
    r = requests.post(url=url, data=data, headers=headers)   

    return r.json()


def get_developer_name(company_id):
    headers={'user-key': settings.IGDB_KEY}
    data = f"fields name,slug; where id={company_id};"
    url = settings.IGDB_URL.format(endpoint='companies')
    r = requests.post(url=url, data=data, headers=headers) 

    return r.json()

def get_developer(game_id):
    data = f'fields *; where game={game_id} & developer=true;'
    headers={'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='involved_companies')
    r = requests.post(url=url, data=data, headers=headers)
    developer = get_developer_name(r.json()[0]['company'])

    return developer
