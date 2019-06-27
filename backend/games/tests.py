from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import Mock, MagicMock, patch

from .fields import game_fields, search_fields, popular_fields, backdrop_fields

class GameTests(APITestCase):

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
    def test_get_popular(self, mock_post):

        """Ensure we can obtain a list of popular games."""
        # Create Mock post and response return value
        mock_response = Mock()
        expected_dict = [
        {
            "id": 1877,
            "cover": {
                "id": 75012,
                "image_id": "co1lvo"
            },
            "name": "Cyberpunk 2077",
            "popularity": 1735.401818908951
        },
        {
            "id": 119207,
            "cover": {
                "id": 74840,
                "image_id": "co1lqw"
            },
            "name": "Aquapark.io",
            "popularity": 1380.091049131278
        },
        {
            "id": 38967,
            "cover": {
                "id": 75151,
                "image_id": "co1lzj"
            },
            "name": "Cooking Simulator",
            "popularity": 1332.181668715655
        },
        {
            "id": 114455,
            "cover": {
                "id": 71287,
                "image_id": "co1j07"
            },
            "name": "Pacify",
            "popularity": 536.4335905677425
        },
        {
            "id": 115276,
            "cover": {
                "id": 71673,
                "image_id": "co1jax"
            },
            "name": "Super Mario Maker 2",
            "popularity": 339.6555774443441
        },
        {
            "id": 10760,
            "cover": {
                "id": 24758,
                "image_id": "jt5ypn4a00wf4bmqrhre"
            },
            "name": "Bloodstained: Ritual of the Night",
            "popularity": 330.4026928147172
        }]
        mock_response.json.return_value = expected_dict
        mock_post.return_value = mock_response

        url = reverse('get-popular')
        response = self.client.get(url, format='json')

        # Test mock is called with correct arguments
        self.assertEqual(mock_post.call_count, 1)
        self.assertEqual(mock_post.call_args[1]['data'],
                            f'fields {popular_fields}; sort popularity desc; limit 6;')
        self.assertEqual(mock_post.call_args[1]['url'],
                            'https://api-v3.igdb.com/games/')
        # Test response contains expected result
        self.assertEqual(response.json(), expected_dict)
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
