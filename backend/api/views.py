import json
import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view()
def get_game(request, igdb):
    data = f'fields *; where id={igdb};'
    headers={'user-key': settings.IGDB_KEY}
    r = requests.post(settings.IGDB_URL, data=data, headers=headers)

    return Response(json.loads(r.content))
    