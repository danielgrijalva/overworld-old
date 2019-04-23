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
    data = f'fields *; where id={igdb};'
    headers={'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers)

    return Response(r.json())
    
@api_view(['GET', 'POST'])
def log(request):
    if request.method == 'POST':
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def search(request, name):
    params = {'search': name, 'fields': fields}
    headers={'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, params=params, headers=headers) 

    return Response(r.json())

@api_view(['GET'])
def get_cover(request, cover_id):
    data = f'fields: image_id; where id={cover_id};'
    headers={'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='covers')
    r = requests.post(url=url, data=data, headers=headers)   

    return Response(r.json())

@api_view(['GET'])
def get_company(request, company_id):
    inv = get_involved_company(company_id)
    headers={'user-key': settings.IGDB_KEY}
    data = f"fields name,slug; where id={inv[0]['company']};"
    url = settings.IGDB_URL.format(endpoint='companies')
    r = requests.post(url=url, data=data, headers=headers) 

    return Response(r.json())
    
def get_involved_company(involved_company_id):
    data = f'fields *; where id={involved_company_id};'
    headers={'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='involved_companies')
    r = requests.post(url=url, data=data, headers=headers)

    return r.json()