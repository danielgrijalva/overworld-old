import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .fields import game_fields, search_fields, popular_fields, backdrop_fields
from .models import Game


@api_view(['GET'])
def get_game(request, guid):
    """Get a game from IGDB.

    Makes a call to the `https://api-v3.igdb.com/games` endpoint, specifying the
    fields (defined as `game_fields` in fields.py) and game ID in the POST data.
    
    For more details read https://api-docs.igdb.com/?javascript#game.

    Args:
        guid: the game id.

    Returns:
        game: a JSON response containing the details of a game.
    """
    data = f'fields {game_fields}; where id={guid};'
    headers = {'user-key': settings.IGDB_KEY}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers)

    return Response(r.json())


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

    Returns:
        games: six games sorted by popularity.
    """
    data = f'fields {popular_fields}; sort popularity desc; limit 6;'
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
