from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import Mock, MagicMock, patch
from games.models import Game
from .fields import game_fields, search_fields, popular_fields, backdrop_fields, genre_fields
import json


class GameTests(APITestCase):
    @patch('games.views.requests.post')
    def test_get_game_multi_not_found(self, mock_post):
        """Ensure that the API returns 404 status with an unknown games."""
        mock_response = Mock()
        mock_response.json.return_value = []
        mock_post.return_value = mock_response

        url = reverse('get-games')
        response = self.client.get(
            url, {"slugs": "not a game,more not a game"}, format='json')

        # Test mock is called with correct arguments
        self.assertEqual(mock_post.call_count, 1)
        self.assertEqual(mock_post.call_args[1]['data'],
                         f'fields {game_fields}; where slug=("not a game","more not a game");')
        self.assertEqual(mock_post.call_args[1]['url'],
                         'https://api-v3.igdb.com/games/')
        # No game exists with slug = "0", IGDB returns empty []
        # Test response is 404 with "Game not found." message
        self.assertEqual(response.json(), {'detail': 'Game not found.'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @patch('games.views.requests.post')
    def test_get_game_multi(self, mock_post):
        """Ensure we can obtain multiple games from IGDB."""

        # Create Mock post and response return value
        mock_response = Mock()
        expected_dict = [{
            "id": 2155,
            "cover": {"id": 43486, "image_id": "e57qvevkjfapzizl3qhn"},
            "first_release_date": 1316649600,
            "name": "Dark Souls",
            "slug": "dark-souls",
        }, {"id": 2155,
            "cover": {"id": 57907, "image_id": "qcx7vedma0pvf0hzisxc"},
            "first_release_date": 1373328000,
            "name": "Dota 2",
            "slug": "dota-2", }]
        mock_response.json.return_value = expected_dict
        mock_post.return_value = mock_response

        url = reverse('get-games')
        response = self.client.get(
            url, {"slugs": "dark-souls,dota-2"},  format='json', )

        # Test mock is called with correct arguments
        self.assertEqual(mock_post.call_count, 1)
        self.assertEqual(mock_post.call_args[1]['data'],
                         f'fields {game_fields}; where slug=("dark-souls","dota-2");')
        self.assertEqual(mock_post.call_args[1]['url'],
                         'https://api-v3.igdb.com/games/')
        # Test response contains expected result
        self.assertEqual(response.json(), expected_dict)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('games.views.requests.post')
    def test_get_game(self, mock_post):
        """Ensure we can obtain a game from IGDB."""
        # Create Mock post and response return value
        mock_response = Mock()
        expected_dict = [{
            "id": 2155,
            "cover": {"id": 43486, "image_id": "e57qvevkjfapzizl3qhn"},
            "first_release_date": 1316649600,
            "name": "Dark Souls",
            "slug": "dark-souls",
        }]
        mock_response.json.return_value = expected_dict
        mock_post.return_value = mock_response

        url = reverse('get-game', kwargs={'slug': 'dark-souls'})
        response = self.client.get(url, format='json')

        # Test mock is called with correct arguments
        self.assertEqual(mock_post.call_count, 1)
        self.assertEqual(mock_post.call_args[1]['data'],
                         f'fields {game_fields}; where slug="dark-souls";')
        self.assertEqual(mock_post.call_args[1]['url'],
                         'https://api-v3.igdb.com/games/')
        # Test response contains expected result
        self.assertEqual(response.json(), expected_dict)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('games.views.requests.post')
    def test_game_not_found(self, mock_post):
        """Ensure that the API returns 404 status with an unknown game."""
        # Create Mock post and response return value
        mock_response = Mock()
        mock_response.json.return_value = []
        mock_post.return_value = mock_response

        url = reverse('get-game', kwargs={'slug': '0'})
        response = self.client.get(url, format='json')

        # Test mock is called with correct arguments
        self.assertEqual(mock_post.call_count, 1)
        self.assertEqual(mock_post.call_args[1]['data'],
                         f'fields {game_fields}; where slug="0";')
        self.assertEqual(mock_post.call_args[1]['url'],
                         'https://api-v3.igdb.com/games/')
        # No game exists with slug = "0", IGDB returns empty []
        # Test response is 404 with "Game not found." message
        self.assertEqual(response.json(), {'detail': 'Game not found.'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @patch('games.views.requests.post')
    def test_search_game(self, mock_post):
        """Ensure we can search a game given a name."""
        # Create Mock post and response return value
        mock_response = Mock()
        expected_dict = [{
            "id": 2155,
            "first_release_date": 1316649600,
            "name": "Dark Souls",
            "slug": "dark-souls"
        },
            {
                "id": 2368,
                "first_release_date": 1394496000,
                "name": "Dark Souls II",
                "slug": "dark-souls-ii"
        },
            {
                "id": 11133,
                "first_release_date": 1458777600,
                "name": "Dark Souls III",
                "slug": "dark-souls-iii"
        }]
        mock_response.json.return_value = expected_dict
        mock_post.return_value = mock_response

        url = reverse('search-game', kwargs={'name': 'Dark Souls'})
        response = self.client.get(url, format='json')

        # Test mock is called with correct arguments
        self.assertEqual(mock_post.call_count, 1)
        self.assertEqual(mock_post.call_args[1]['data'],
                         f'fields {search_fields}; search "Dark Souls";')
        self.assertEqual(mock_post.call_args[1]['url'],
                         'https://api-v3.igdb.com/games/')
        # Test response contains expected result
        self.assertEqual(response.json(), expected_dict)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('games.views.requests.post')
    def test_get_popular_with_adult_content(self, mock_post):
        mock_response = Mock()
        expected_dict = [{}]
        mock_response.json.return_value = expected_dict
        mock_post.return_value = mock_response
        url = reverse('get-popular')

        # don't filter adult content
        response = self.client.get(url, {"adultContent": True}, format='json')
        self.assertEqual(mock_post.call_count, 1)
        self.assertEqual(mock_post.call_args[1]['data'],
                         f'fields {popular_fields}; sort popularity desc; limit 6; offset 0;')
        self.assertEqual(mock_post.call_args[1]['url'],
                         'https://api-v3.igdb.com/games/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('games.views.requests.post')
    def test_get_popular_with_genre_filter(self, mock_post):
        mock_response = Mock()
        expected_dict = [{}]
        mock_response.json.return_value = expected_dict
        mock_post.return_value = mock_response
        url = reverse('get-popular')
        # Valid params and genre filter
        params = {'limit': 20, 'offset': 0,
                  'filters': json.dumps({"genre": [{"id": 1}]})}
        response = self.client.get(url, params, format='json')

        self.assertEqual(mock_post.call_count, 1)
        self.assertEqual(mock_post.call_args[1]['data'],
                         f'fields {popular_fields}; sort popularity desc; limit 20; offset 0; where themes != (42);where genres=1;')
        self.assertEqual(mock_post.call_args[1]['url'],
                         'https://api-v3.igdb.com/games/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('games.views.requests.post')
    def test_get_popular_with_date_filter(self, mock_post):
        mock_response = Mock()
        expected_dict = [{}]
        mock_response.json.return_value = expected_dict
        mock_post.return_value = mock_response
        params = {'limit': 20, 'offset': 0, 'filters': json.dumps({'genre': [], 'date': [{'order': 'Before', 'dateString': '2019-07-28', 'utc': 1564272000, 'name': 'Before: 2019-07-28'}, {
                                                                  'order': 'After', 'dateString': '2019-07-01', 'utc': 1561939200, 'name': 'After: 2019-07-01'}]})}
        url = reverse('get-popular')
        response = self.client.get(url, params, format='json')
        self.assertEqual(mock_post.call_count, 1)
        self.assertEqual(mock_post.call_args[1]['data'],
                         f'fields {popular_fields}; sort popularity desc; limit 20; offset 0; where themes != (42);where release_date.date <= 1564272000;where release_date.date >= 1561939200;')
        self.assertEqual(mock_post.call_args[1]['url'],
                         'https://api-v3.igdb.com/games/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('games.views.requests.post')
    def test_get_popular_with_no_params(self, mock_post):
        mock_response = Mock()
        expected_dict = [{}]
        mock_response.json.return_value = expected_dict
        mock_post.return_value = mock_response
        url = reverse('get-popular')

        # No params at all
        response = self.client.get(url, format='json')
        self.assertEqual(mock_post.call_count, 1)
        self.assertEqual(mock_post.call_args[1]['data'],
                         f'fields {popular_fields}; sort popularity desc; limit 6; offset 0; where themes != (42);')
        self.assertEqual(mock_post.call_args[1]['url'],
                         'https://api-v3.igdb.com/games/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('games.views.requests.post')
    def test_get_popular_with_limit_and_offset(self, mock_post):
        """Ensure we can obtain a list of popular games with out of bounds limit and offset"""
        # Create Mock post and response return value
        mock_response = Mock()
        expected_dict = [{}]
        mock_response.json.return_value = expected_dict
        mock_post.return_value = mock_response
        url = reverse('get-popular')

        # out of bounds simple params
        response = self.client.get(
            url, {"limit": 100, "offset": 200}, format='json')
        # Test mock is called with correct arguments
        self.assertEqual(mock_post.call_count, 1)
        self.assertEqual(mock_post.call_args[1]['data'],
                         f'fields {popular_fields}; sort popularity desc; limit 6; offset 0; where themes != (42);')
        self.assertEqual(mock_post.call_args[1]['url'],
                         'https://api-v3.igdb.com/games/')
        # Test response contains expected result
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    @patch('games.views.requests.post')
    def test_get_genres(self, mock_post):
        """Ensure we can obtain a list of popular games with out of bounds limit and offset"""
        # Create Mock post and response return value
        mock_response = Mock()
        expected_dict = [{}]
        mock_response.json.return_value = expected_dict
        mock_post.return_value = mock_response
        url = reverse('get-genres')

        # out of bounds simple params
        response = self.client.get(url, format='json')
        # Test mock is called with correct arguments
        self.assertEqual(mock_post.call_count, 1)
        self.assertEqual(mock_post.call_args[1]['data'],
                         f'fields {genre_fields}; limit 50;')

        self.assertEqual(mock_post.call_args[1]['url'],
                         'https://api-v3.igdb.com/genres/')
        # Test response contains expected result
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    @patch('games.views.requests.post')
    def test_get_game_rating_invalid_game(self, mock_post):
        """Attempt to get rating for game for which a rating does not exist"""
        # Create Mock post and response return value
        mock_response = Mock()
        expected_dict = [{}]
        mock_response.json.return_value = expected_dict
        mock_post.return_value = mock_response
        url = reverse('get-game-ratings', kwargs={'slug': 'not a slug'})

        # out of bounds simple params
        response = self.client.get(url, format='json')
        # Test mock is called with correct arguments
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @patch('games.views.requests.post')
    def test_get_game_rating(self, mock_post):
        """Get rating for game -- depends on game having rating in DB"""


        game = Game.objects.create(
            igdb=1074,
            name='Super Mario 64',
            slug='super-mario-64',
            cover_id='iwe8jlk21lmf',
            backdrop_id='i43a2ksd901R43'
        )
        url = reverse('rate-game')
        data = {
            'igdb': game.igdb,
            'name': game.name,
            'slug': game.slug,
            'cover_id': game.cover_id,
            'backdrop_id': game.backdrop_id,
            'rating': 4.5
        }
        # create rating for game
        response = self.client.post(url, data, format='json')

        #get rating from db
        mock_response = Mock()
        expected_dict = [{}]
        mock_response.json.return_value = expected_dict
        mock_post.return_value = mock_response
        url = reverse('get-game-ratings', kwargs={'slug': game.slug})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
   

    @patch('games.views.requests.post')
    def test_get_backdrop(self, mock_post):
        """Ensure we can retrieve a game's screenshots/artwork."""
        # Create Mock post and response return value
        mock_response = Mock()
        expected_dict = [{
            "id": 2155,
            "name": "Dark Souls",
            "screenshots": [
                {
                    "id": 2613,
                    "image_id": "sylfmtzktmb4b0ext8nr"
                },
                {
                    "id": 2614,
                    "image_id": "nz70mpjc7kszcyesgmqw"
                }
            ],
            "slug": "dark-souls"
        }]
        mock_response.json.return_value = expected_dict
        mock_post.return_value = mock_response

        url = reverse('get-backdrop', kwargs={'guid': 2155})
        response = self.client.get(url, format='json')

        # Test mock is called with correct arguments
        self.assertEqual(mock_post.call_count, 1)
        self.assertEqual(mock_post.call_args[1]['data'],
                         f'fields {backdrop_fields}; where id=2155;')
        self.assertEqual(mock_post.call_args[1]['url'],
                         'https://api-v3.igdb.com/games/')
        # Test response contains expected result
        self.assertEqual(response.json(), expected_dict)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
