from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class GameTests(APITestCase):
    def test_get_game(self):
        """Ensure we can obtain a game from IGDB."""
        url = reverse('get-game', kwargs={'guid': 1074})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_game_not_found(self):
        """Ensure that the API returns 404 status with an unknown game."""
        url = reverse('get-game', kwargs={'guid': '0'})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_search_game(self):
        """Ensure we can search a game given a name."""
        url = reverse('search-game', kwargs={'name': 'Dark Souls'})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_popular(self):
        """Ensure we can obtain a list of popular games."""
        url = reverse('get-popular')
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_backdrop(self):
        """Ensure we can retrieve a game's screenshots/artwork."""
        url = reverse('get-backdrop', kwargs={'guid': 1074})
        response = self.client.get(url, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
