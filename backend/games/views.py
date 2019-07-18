import requests
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from .fields import game_fields, search_fields, popular_fields, backdrop_fields
from .models import Game
from django.utils.datastructures import MultiValueDictKeyError

@api_view(['GET'])
def get_games(request):
    """Get a list of games from IGDB.

    Makes a call to the `https://api-v3.igdb.com/games` endpoint, specifying the
    fields (defined as `game_fields` in fields.py) and game IDs in the POST data.
    
    For more details read https://api-docs.igdb.com/?javascript#game.

    Args:
        slugs: a list of unique name of the game e.g. dark-souls, prey, prey--1. maximum of 10 per request

    Returns:
        game: a JSON response containing a list of the details of the games.
    """
    slugs = request.GET['slugs']
    slugs = (",").join([f'"{x}"' for x in slugs.split(",")][:10])
    
    data = f'fields {game_fields}; where slug=({slugs});'
    headers = {'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers).json()

    if not r:
        raise NotFound(detail='Game not found.')

    return Response(r)

@api_view(['GET'])
def get_game(request, slug):
    """Get a game from IGDB.

    Makes a call to the `https://api-v3.igdb.com/games` endpoint, specifying the
    fields (defined as `game_fields` in fields.py) and game ID in the POST data.
    
    For more details read https://api-docs.igdb.com/?javascript#game.

    Args:
        slug: unique name of the game e.g. dark-souls, prey, prey--1.

    Returns:
        game: a JSON response containing the details of a game.
    """
    data = f'fields {game_fields}; where slug="{slug}";'
    headers = {'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers).json()

    if not r:
        raise NotFound(detail='Game not found.')

    return Response(r)


@api_view(['GET'])
def search_game(request, name):
    """Search a game based on a name.
    
    Calls `https://api-v3.igdb.com/games` specifying the search term in the
    POST data. The search term must be a string, the name of the game. The
    fields shown in the results are defined in `search_fields` from fields.py.
    
    For more details on how to search the IGDB API, read 
    https://api-docs.igdb.com/?javascript#search-176.

    Args:
        name: the search term, name of the desired game.

    Returns:
        games: a JSON containing a list of search results.
    """
    data = f'fields {search_fields}; search "{name}";'
    headers = {'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers)

    return Response(r.json())


@api_view(['GET'])
def get_popular_games(request):
    """Gets popular or trending games.
    
    Calls the `games` endpoint, sorting the results by popularity (desc).
    This endpoint is called in Overworld's landing page. An example of this
    is documented on IGDB https://api-docs.igdb.com/?javascript#examples-12. 

    Takes limit parameter with max of 50, min 1 and default of 6 if not passed
    Returns:
        games: games sorted by popularity.
    """
    

    #get parameters with defaults and check 
    limit = int(request.GET.get("limit", 6)) 
    limit = limit if limit < 50 and limit > 0 else 6 

    offset = int(request.GET.get("offset", 0))
    offset = offset if offset >= 0 and offset < 150 else 0

    data = f'fields {popular_fields}; sort popularity desc; limit {limit}; offset {offset};'
    headers = {'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers)

    return Response(r.json())


@api_view(['GET'])
def get_backdrop(request, guid):
    """Gets the background image for the landing page.
    
    Makes a call to `https://api-v3.igdb.com/games`, with image-related fields
    only. The game the backdrop is selected from is randomly selected in the 
    frontend.

    Args:
        guid: ID of the game.

    Returns:
        backdrop: a JSON object with the image IDs necessary for the backdrop.
    """
    data = f'fields {backdrop_fields}; where id={guid};'
    headers = {'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers)

    return Response(r.json())
