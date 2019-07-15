from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import CustomUser
from games.models import Game


class ActionsTests(APITestCase):
    def setUp(self):
        user_data = {
            'username': 'testing',
            'email': 'testing@overworld.com',
            'password': 'testingOverworld'
        }
        self.user = CustomUser.objects.create(**user_data)
        self.game = Game.objects.create(
                        igdb=1074,
                        name='Super Mario 64',
                        slug='super-mario-64',
                        cover_id='iwe8jlk21lmf',
                        backdrop_id='i43a2ksd901R43'
                    )
        self.client.force_authenticate(user=self.user)

    def test_get_actions(self):
        """Ensure we can retrieve the actions between a user and a game."""
        url = reverse('get-actions')
        data = {'igdb': self.game.igdb, 'name': self.game.name, 'slug': self.game.slug}
        response = self.client.get(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_log_unlog_game(self):
        """Ensure we can log and unlog a game."""
        url = reverse('log-game')
        data = {
                'igdb': self.game.igdb,
                'name': self.game.name,
                'slug': self.game.slug,
                'cover_id': self.game.cover_id,
                'backdrop_id': self.game.backdrop_id
            }

        log = self.client.post(url, data, format='json')
        self.assertEqual(True, log.data['value'])

        unlog = self.client.post(url, data, format='json')
        self.assertEqual(False, unlog.data['value'])

    def test_like_unlike_game(self):
        """Ensure we can like and unlike a game."""
        url = reverse('like-game')
        data = {
                'igdb': self.game.igdb,
                'name': self.game.name,
                'slug': self.game.slug,
                'cover_id': self.game.cover_id,
                'backdrop_id': self.game.backdrop_id
            }

        like = self.client.post(url, data, format='json')
        self.assertEqual(True, like.data['value'])

        unlike = self.client.post(url, data, format='json')
        self.assertEqual(False, unlike.data['value'])

    def test_add_remove_from_backlog(self):
        """Ensure we can add and remove a game from our backlog."""
        url = reverse('add-to-backlog')
        data = {
                'igdb': self.game.igdb,
                'name': self.game.name,
                'slug': self.game.slug,
                'cover_id': self.game.cover_id,
                'backdrop_id': self.game.backdrop_id
            }

        add = self.client.post(url, data, format='json')
        self.assertEqual(True, add.data['value'])

        remove = self.client.post(url, data, format='json')
        self.assertEqual(False, remove.data['value'])

    def test_add_remove_from_wishlist(self):
        """Ensure we can add and remove a game from our wishlist."""
        url = reverse('add-to-wishlist')
        data = {
                'igdb': self.game.igdb,
                'name': self.game.name,
                'slug': self.game.slug,
                'cover_id': self.game.cover_id,
                'backdrop_id': self.game.backdrop_id
            }

        add = self.client.post(url, data, format='json')
        self.assertEqual(True, add.data['value'])

        remove = self.client.post(url, data, format='json')
        self.assertEqual(False, remove.data['value'])

    def test_get_rating(self):
        """Ensure we can retrieve the rating."""
        url = reverse('rate-game')
        data = {'igdb': self.game.igdb}
        response = self.client.get(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_rate_game(self):
        """Ensure we can rate a game."""
        url = reverse('rate-game')
        data = {
            'igdb': self.game.igdb,
            'name': self.game.name,
            'slug': self.game.slug,
            'cover_id': self.game.cover_id,
            'backdrop_id': self.game.backdrop_id,
            'rating': 4.5
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_rating_value(self):
        """Ensure rating values are between 1 and 10."""
        url = reverse('rate-game')
        negative_rating = {
            'igdb': self.game.igdb,
            'name': self.game.name,
            'slug': self.game.slug,
            'cover_id': self.game.cover_id,
            'backdrop_id': self.game.backdrop_id,
            'rating': -1
        }
        big_rating = negative_rating
        big_rating['rating'] = 6

        negative = self.client.post(url, negative_rating, format='json')
        big = self.client.post(url, big_rating, format='json')

        self.assertEqual(negative.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(big.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_add_journal_entry(self):
        """Ensure we can add a journal entry."""
        url = reverse('journal')
        data = {
            'game': {
                'id': self.game.igdb,
                'name': self.game.name,
                'slug': self.game.slug,
                'coverId': self.game.cover_id,
                'backdropId': self.game.backdrop_id
            },
            'date': '2019-06-28',
            'review': 'cool game',
            'spoilers': False,
            'liked': True,
            'rating': 5
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)     

    def test_get_journal_entries(self):
        """Ensure we can obtain a user's journal."""
        url = reverse('journal')
        data = {
            'game': {
                'id': self.game.igdb,
                'name': self.game.name,
                'slug': self.game.slug,
                'coverId': self.game.cover_id,
                'backdropId': self.game.backdrop_id
            },
            'date': '2019-06-28',
            'review': 'cool game',
            'spoilers': False,
            'liked': True,
            'rating': 5
        }
        expected = [{
            'year': 2019,
            'months': [
                {
                    'month': 6,
                    'entries': [
                    {
                        'id': 1,
                        'game': {
                            'igdb': 1074,
                            'name': 'Super Mario 64',
                            'slug': 'super-mario-64',
                            'cover_id': 'iwe8jlk21lmf',
                            'backdrop_id': 'i43a2ksd901R43'
                        },
                        'date': '2019-06-28',
                        'review': 'cool game',
                        'spoilers': False,
                        'liked': True,
                        'rating': '5.0',
                        'user': 1
                    }
                    ]
                }
            ]
        }]
        response = self.client.post(url, data, format='json')
        response = self.client.get(url, {'username': 'testing'} ,format='json')

        self.assertEqual(response.data, expected)             
        self.assertEqual(response.status_code, status.HTTP_200_OK)     
        
    def test_add_favorite_game(self):
        url = reverse('add-favorite')
        data =  {
                'igdb': self.game.igdb,
                'name': self.game.name,
                'slug': self.game.slug,
                'cover_id': self.game.cover_id,
                'backdrop_id': self.game.backdrop_id
            }

        response = self.client.post(url, data, format='json')
        self.assertEqual(self.game, self.user.favorites.all()[0])

    def test_remove_favorite_game(self):
        url = reverse('remove-favorite')
        data =  {
                'igdb': self.game.igdb,
                'name': self.game.name,
                'slug': self.game.slug,
                'cover_id': self.game.cover_id,
                'backdrop_id': self.game.backdrop_id
            }
        # add the game first
        self.client.post(reverse('add-favorite'), data, format='json')
        response = self.client.post(url, data, format='json')

        self.assertFalse(len(self.user.favorites.all()))
    
    def test_get_favorite_games(self):
        url = reverse('get-favorites')
        data =  {
                'igdb': self.game.igdb,
                'name': self.game.name,
                'slug': self.game.slug,
                'cover_id': self.game.cover_id,
                'backdrop_id': self.game.backdrop_id
            }
        # add the game first
        self.client.post(reverse('add-favorite'), data, format='json')
        response = self.client.get(url, format='json')

        self.assertEqual(response.json(), [data])
                