import itertools
from django.core.exceptions import ObjectDoesNotExist
from django.db.models.functions import ExtractMonth, ExtractYear
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from games.models import Game
from users.models import CustomUser
from .serializers import RatingSerializer, ActionSerializer, JournalSerializer
from .models import Ratings, Journal
from .utils import AllowAnyGet

class Actions(generics.GenericAPIView):
    """Endpoint for obtaining a user's relationship with a game.

    Actions are events that link a user and a game. Users can indicate that
    they have played or liked a game and add a game to their backlog or 
    wishlist. This relationship is represented with many-to-many fields.

    If the requested game does not exist in Overworld's database, that means
    that no one has interacted with it, and so we return nothing.
    
    The user must be authenticated for obvious reasons.

    Args:
        igdb: the ID of the game.

    Returns:
        actions: a JSON indicating each action with True/False values.
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            igdb = request.GET['igdb']
            game = Game.objects.get(igdb=igdb)
        except ObjectDoesNotExist:
            return Response({})

        actions = {}
        user = CustomUser.objects.get(id=request.user.id)
        actions['played'] = True if game in user.played.all() else False
        actions['liked'] = True if game in user.liked.all() else False
        actions['backlog'] = True if game in user.backlog.all() else False
        actions['wishlist'] = True if game in user.wishlist.all() else False

        return Response(actions)


class Log(generics.GenericAPIView):
    """Endpoint for indicating that you've played a game.

    This adds/removes a game from the users `played` field, which is a
    many-to-many relationship. If the game isn't in the database, we create
    it with the `get_or_create` method.

    Users must be authenticated to interact with this endpoint.

    Args:
        igdb: the ID of the game.
        name: the name of the game.

    Returns:
        response: an ActionSerializer indicating who logged what and the
        boolean value of the action.
    """
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game, _ = Game.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)

        # toggle played value
        if game not in user.played.all():
            user.played.add(game)
            value = True
        else:
            user.played.remove(game)
            value = False

        data = {'game': game.id, 'user': user.id,
                'action': 'log', 'value': value}

        serializer = ActionSerializer(data=data)

        if serializer.is_valid():
            # if the game you just logged was in your backlog,
            # then remove it from backlog
            serializer = serializer.data
            if game in user.backlog.all() and value:
                user.backlog.remove(game)
                serializer['removedFromBacklog'] = True

            return Response(serializer)


class Like(generics.GenericAPIView):
    """Endpoint for indicating that you've liked a game.

    This adds/removes a game from the users `liked` field, which is a
    many-to-many relationship. If the game isn't in the database, we create
    it with the `get_or_create` method.

    Users must be authenticated to interact with this endpoint.

    Args:
        igdb: the ID of the game.
        name: the name of the game.

    Returns:
        response: an ActionSerializer indicating who liked what and the
        boolean value of the action.
    """    
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game, _ = Game.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)

        # toggle liked value
        if game not in user.liked.all():
            user.liked.add(game)
            value = True
        else:
            user.liked.remove(game)
            value = False

        data = {'game': game.id, 'user': user.id,
                'action': 'like', 'value': value}

        serializer = ActionSerializer(data=data)

        if serializer.is_valid():
            return Response(serializer.data)


class Backlog(generics.GenericAPIView):
    """Endpoint for adding a game to your backlog.

    This adds/removes a game from the users `backlog` field, which is a
    many-to-many relationship. If the game isn't in the database, we create
    it with the `get_or_create` method.

    Users must be authenticated to interact with this endpoint.

    Args:
        igdb: the ID of the game.
        name: the name of the game.

    Returns:
        response: an ActionSerializer indicating who backlogged what and the
        boolean value of the action.
    """    
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game, _ = Game.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)

        # toggle backlog value
        if game not in user.backlog.all():
            user.backlog.add(game)
            value = True
        else:
            user.backlog.remove(game)
            value = False

        data = {'game': game.id, 'user': user.id,
                'action': 'backlog', 'value': value}

        serializer = ActionSerializer(data=data)

        if serializer.is_valid():
            return Response(serializer.data)


class Wishlist(generics.GenericAPIView):
    """Endpoint for adding a game to your wishlist.

    This adds/removes a game from the users `wishlist` field, which is a
    many-to-many relationship. If the game isn't in the database, we create
    it with the `get_or_create` method.

    Users must be authenticated to interact with this endpoint.

    Args:
        igdb: the ID of the game.
        name: the name of the game.

    Returns:
        response: an ActionSerializer indicating who wishlisted what and the
        boolean value of the action.
    """    
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        game, _ = Game.objects.get_or_create(**request.data)
        user = CustomUser.objects.get(id=request.user.id)

        # toggle wishlist value
        if game not in user.wishlist.all():
            user.wishlist.add(game)
            value = True
        else:
            user.wishlist.remove(game)
            value = False

        data = {'game': game.id, 'user': user.id,
                'action': 'wishlist', 'value': value}

        serializer = ActionSerializer(data=data)

        if serializer.is_valid():
            return Response(serializer.data)


class Rate(generics.GenericAPIView):
    """Endpoint related to rating a game.

    Users can rate a game in a scale of 1 to 10. This value is saved in the
    Ratigs model, which takes the IDs of a user and a game as foreign keys.
    This endpoint accepts both GET and POST methods.

    Users must be authenticated to interact with this endpoint.
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        """Get rating for a specific game by the logged-in user.

        If the game or rating don't exist in the database, no rating exists,
        so we return nothing.

        Args:
            game: the game ID.

        Returns:
            response: a RatingSerializer indicating the user, game and rating.
        """
        try:
            igdb = request.GET['igdb']
            game = Game.objects.get(igdb=igdb)
            user = CustomUser.objects.get(id=request.user.id)
            r = Ratings.objects.get(game=game, user=user)
        except ObjectDoesNotExist:
            return Response({})

        serializer = RatingSerializer(r)

        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """Rate a game.

        Creates a Rating object, which consists of a user, a game and a rating
        value. If the game or rating don't exist in the database, create them 
        using the `get_or_create` method.

        Args:
            rating: the rating value (1-10)
            igdb: the ID of the game

        Returns:
            response: a RatingSerializer indicating the user, game and rating.
        """
        rating = request.data['rating']
        if rating <= 0 or rating > 10:
            return Response({'detail': 'Invalid rating!'}, status.HTTP_400_BAD_REQUEST)

        igdb = request.data['igdb']
        name = request.data['name']
        slug = request.data['slug']
        game, _ = Game.objects.get_or_create(igdb=igdb, name=name, slug=slug)
        user = CustomUser.objects.get(id=request.user.id)

        r, _ = Ratings.objects.get_or_create(game=game, user=user)
        r.rating = rating
        r.save()

        serializer = RatingSerializer(r).data

        return Response(serializer)


class JournalView(generics.GenericAPIView):
    """Endpoint for the gaming journal."""
    permission_classews = (AllowAnyGet,)
    serializer_class = JournalSerializer
    
    def post(self, request, *args, **kwargs):
        """Creates a journal entry.
        
        Journal entries are tipycally created when a user finishes a game and
        wants to register that event in their profile. A journal entry must
        have a date, a user and a game. 

        Args:
            game: id of the game
            date: the day you finished the game (format YYYY-MM-DD)
            review: a game review (optional)
            spoilers: whether the review contains spoilers or not (optional)
            liked: whether the user liked the game or not (optional)
            rating: the rating value (1-10) (optional)
        """
        igdb = request.data['game']['id']
        name = request.data['game']['name']
        slug = request.data['game']['slug']
        game, _ = Game.objects.get_or_create(igdb=igdb, name=name, slug=slug)

        user = CustomUser.objects.get(id=request.user.id)
        request.data['game'] = game 

        if request.data.get('rating'):
            r, _ = Ratings.objects.get_or_create(game=game, user=user)
            r.rating = request.data['rating']
            r.save()

        if request.data.get('liked'):
            user.liked.add(game)

        if game in user.backlog.all():
            user.backlog.remove(game)

        entry = Journal.objects.create(user=user, **request.data)
        user.played.add(game)
        
        return Response(JournalSerializer(entry).data)

    def get(self, request, *args, **kwargs):
        """Get the gaming journal of a user.

        It's a timeline of finished games, grouped by year and month, sorted
        from newest to oldest.

        Args:
            username: username requested
            limit: number of entries to return
        """
        limit = int(request.GET.get('limit', 0))
        if limit <= 0:
            limit = None

        user = CustomUser.objects.get(username=request.GET['username'])
        entries = Journal.objects.filter(user=user).annotate(
                    month=ExtractMonth('date'), 
                    year=ExtractYear('date')).order_by('-date')[:limit]

        # http://ls.pwd.io/2013/05/create-groups-from-lists-with-itertools-groupby/
        response = []
        year_getter = lambda x: x.year
        month_getter = lambda x: x.month
        for year, year_entries in itertools.groupby(entries, key=year_getter):
            year = {'year': year, 'months': []}
            for month, group in itertools.groupby(list(year_entries), key=month_getter):
                month_entries = JournalSerializer(list(group), many=True)
                month = {'month': month, 'entries': month_entries.data}
                year['months'].append(month)

            response.append(year)

        return Response(response)
