import json
import requests
from datetime import datetime
from django.conf import settings
from django.utils.datastructures import MultiValueDictKeyError
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from actions.models import Ratings
from actions.serializers import RatingSerializer
from .fields import game_fields, search_fields, company_fields, company_logo_fields, company_game_fields, popular_fields, backdrop_fields, genre_fields, recents_fields, upcoming_fields
from .models import Game


@api_view(['GET'])
def get_genres(request):
    """Get list of all genres
        Makes call to https://api.igdb.com/v4/genres with maximum limit and no params
     """
    data = f'fields {genre_fields}; limit 50;'
    headers = {'client-id': settings.IGDB_KEY, 'authorization': settings.IGDB_AUTH}
    url = settings.IGDB_URL.format(endpoint='genres')
    r = requests.post(url=url, data=data, headers=headers).json()

    return Response(r)
    
@api_view(['GET'])
def get_games(request):
    """Get a list of games from IGDB.

    Makes a call to the `https://api.igdb.com/v4/games` endpoint, specifying the
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
    headers = {'client-id': settings.IGDB_KEY, 'authorization': settings.IGDB_AUTH}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers).json()

    if not r:
        raise NotFound(detail='Game not found.')

    return Response(r)

@api_view(['GET'])
def get_game(request, slug):
    """Get a game from IGDB.

    Makes a call to the `https://api.igdb.com/v4/games` endpoint, specifying the
    fields (defined as `game_fields` in fields.py) and game ID in the POST data.
    
    For more details read https://api-docs.igdb.com/?javascript#game.

    Args:
        slug: unique name of the game e.g. dark-souls, prey, prey--1.

    Returns:
        game: a JSON response containing the details of a game.
    """
    data = f'fields {game_fields}; where slug="{slug}";'
    headers = {'client-id': settings.IGDB_KEY, 'authorization': settings.IGDB_AUTH}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers).json()

    if not r:
        raise NotFound(detail='Game not found.')

    return Response(r)


@api_view(['GET'])
def search_game(request, name):
    """Search a game based on a name.
    
    Calls `https://api.igdb.com/v4/games` specifying the search term in the
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
    headers = {'client-id': settings.IGDB_KEY, 'authorization': settings.IGDB_AUTH}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers)

    return Response(r.json())


@api_view(['GET'])
def get_frontpage_games(request):
    """Gets a set of recently released games and upcoming games from today."""
    
    now = int(datetime.timestamp(datetime.now()))
    recents_query = f'fields {recents_fields}; sort first_release_date desc; where first_release_date < {now};'
    upcoming_query = f'fields {upcoming_fields}; sort first_release_date asc; where first_release_date > {now} & release_dates.category = 0;'
    headers = {'client-id': settings.IGDB_KEY, 'authorization': settings.IGDB_AUTH}
    url = settings.IGDB_URL.format(endpoint='games')

    recents = requests.post(url=url, data=recents_query, headers=headers)
    upcoming = requests.post(url=url, data=upcoming_query, headers=headers)
    r = {'recents': recents.json(), 'upcoming': upcoming.json()}
    return Response(r) 

def get_company_logo(id):
    """Gets company logo."""
    
    query = f'fields {company_logo_fields}; where id = {id};'
    headers = {'client-id': settings.IGDB_KEY, 'authorization': settings.IGDB_AUTH}
    url = settings.IGDB_URL.format(endpoint='company_logos')

    return requests.post(url=url, data=query, headers=headers).json()

def get_games_by_company(cid):
    """Gets games created by a particular company."""
    
    query = f'fields {company_game_fields}; where involved_companies.company = {cid} & involved_companies.developer = true;'
    headers = {'client-id': settings.IGDB_KEY, 'authorization': settings.IGDB_AUTH}
    url = settings.IGDB_URL.format(endpoint='games')

    return requests.post(url=url, data=query, headers=headers).json()

@api_view(['GET'])
def get_company(request, cid):
    """Gets Company/Creator of games from IGDB."""
    
    query = f'fields {company_fields}; where id = {cid};'
    headers = {'client-id': settings.IGDB_KEY, 'authorization': settings.IGDB_AUTH}
    url = settings.IGDB_URL.format(endpoint='companies')

    company_json = requests.post(url=url, data=query, headers=headers).json()

    company_json[0]['logo_details'] = get_company_logo(company_json[0]['logo'])

    games_json = get_games_by_company(cid)

    r = {'company': company_json, 'games': games_json}

    return Response(r) 

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
    

    #get parameters with defaults and check bounds
    limit = int(request.GET.get("limit", 6)) 
    limit = limit if limit < 50 and limit > 0 else 6 

    offset = int(request.GET.get("offset", 0))
    offset = offset if offset >= 0 and offset < 150 else 0

    filters = request.GET.get("filters", '{}')
    filters = json.loads(filters)

    adultContent = request.GET.get("adultContent", False)

    conditions = ""

    if 'genre' in filters and len(filters['genre']):
        ids = tuple([x['id'] for x in filters['genre']]) if len(filters['genre']) > 1 else filters['genre'][0]['id'] #create list of id's in format required by IGDB api
        conditions += f"where genres={ids};"
    
    if 'date' in filters and len(filters['date']):
        if filters['date'][0]:
            conditions += f"where release_date.date <= {filters['date'][0]['utc']};"
        if filters['date'][1]:
            conditions += f"where release_date.date >= {filters['date'][1]['utc']};"

    if 'developer' in filters and len(filters['developer']):
        pass

    if not adultContent:
        data = f'fields {popular_fields}; where date < 1538129353; sort date desc; limit {limit}; offset {offset};' + conditions
        print(data)
    if adultContent:
        data = f'fields {popular_fields}; sort follows asc; limit {limit}; offset {offset};' + conditions

    headers = {'client-id': settings.IGDB_KEY, 'authorization': settings.IGDB_AUTH}
    url = settings.IGDB_URL.format(endpoint='release_dates')
    r = requests.post(url=url, data=data, headers=headers)

    return Response(r.json())


@api_view(['GET'])
def get_backdrop(request, guid):
    """Gets the background image for the landing page.
    
    Makes a call to `https://api.igdb.com/v4/games`, with image-related fields
    only. The game the backdrop is selected from is randomly selected in the 
    frontend.

    Args:
        guid: ID of the game.

    Returns:
        backdrop: a JSON object with the image IDs necessary for the backdrop.
    """
    data = f'fields {backdrop_fields}; where id={guid};'
    headers = {'client-id': settings.IGDB_KEY, 'authorization': settings.IGDB_AUTH}
    url = settings.IGDB_URL.format(endpoint='games')
    r = requests.post(url=url, data=data, headers=headers)

    return Response(r.json())


@api_view(['GET'])
def get_game_ratings(request, slug):
    """Endpoint for getting ratings for a game.

    Supports only GET.

    Args:
        slug: slugified name of a game (unique)
    Returns:
        data: [{game, user_id, rating}...]
    """
    try:
        game = Game.objects.get(slug=slug)
        ratings = Ratings.objects.filter(game=game)
        serializer = RatingSerializer(ratings, many=True).data
        return Response(serializer)
    except:
        raise NotFound(detail='Game does not have rating.')
   
        