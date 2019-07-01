from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import CustomUser


def create_user(client, data=None):
    if not data:
        data = {
            'username': 'testing',
            'email': 'testing@overworld.com',
            'password': 'testingOverworld'
        }
    register_url = reverse('register')
    client.post(register_url, data, format='json')

    return data


class RegisterTests(APITestCase):
    def setUp(self):
        self.data = {
            'username': 'testing',
            'email': 'testing@overworld.com',
            'password': 'testingOverworld'
        }
        self.url = reverse('register')

    def test_register_success(self):
        response = self.client.post(self.url, self.data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_username_exists(self):
        self.client.post(self.url, self.data, format='json')
        response = self.client.post(self.url, self.data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_regsiter_invalid_data(self):
        invalid_data = {
            'email': 'invalidEmail.com',
            'password': 'pass'
        }
        self.client.post(self.url, self.data, format='json')
        response = self.client.post(self.url, invalid_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LoginTests(APITestCase):
    def setUp(self):
        self.data = create_user(self.client)
        self.login_url = reverse('knox-login')

    def test_login_success(self):
        response = self.client.post(self.login_url, self.data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_wrong_password(self):
        invalid_data = {
            'username': 'testing',
            'password': 'wrongPassword'
        }
        response = self.client.post(self.login_url, invalid_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UserTests(APITestCase):
    def setUp(self):
        self.url = reverse('get-user')
        self.data = create_user(self.client)
        self.user = CustomUser.objects.get(username=self.data['username'])
        self.client.force_authenticate(user=self.user)

    def test_get_user(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_unauthorized(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class ProfileTests(APITestCase):
    def setUp(self):
        username = create_user(self.client)['username']
        self.url = reverse('get-profile', kwargs={'username': username})
        self.user = CustomUser.objects.get(username=username)
        self.client.force_authenticate(user=self.user)

    def test_get_profile(self):
        response = self.client.get(self.url)

        self.assertEqual(response.json()['username'], 'testing')
        self.assertEqual(response.json()['email'], 'testing@overworld.com')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_profile_with_following(self):
        friend_data = {
            'username': 'anotherUser',
            'email': 'another@overworld.com',
            'password': 'myPassword123'
        }
        friend_username = create_user(self.client,
                                      data=friend_data)['username']
        data = {'username': friend_username}
        self.client.post(reverse('follow'), data)
        response = self.client.get(self.url)

        # Test my profile with following data
        self.assertEqual(response.json()['username'], 'testing')
        self.assertEqual(response.json()['email'], 'testing@overworld.com')
        self.assertEqual(len(response.json()['following']), 1)
        self.assertEqual(response.json()['following'][0], 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_friend_profile_as_follower(self):
        friend_data = {
            'username': 'anotherUser',
            'email': 'another@overworld.com',
            'password': 'myPassword123'
        }
        friend_username = create_user(self.client,
                                      data=friend_data)['username']
        profile_url = reverse('get-profile',
                              kwargs={'username': friend_username})
        data = {'username': friend_username}
        self.client.post(reverse('follow'), data)
        response = self.client.get(profile_url)

        # Test friend's profile and follower data
        self.assertEqual(response.json()['username'], 'anotherUser')
        self.assertEqual(response.json()['email'], 'another@overworld.com')
        self.assertEqual(len(response.json()['followers']), 1)
        self.assertEqual(response.json()['followers'][0], 1)
        self.assertTrue(response.json()['followingUser'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_profile_of_nonexistant_user(self):
        bad_url = reverse('get-profile', kwargs={'username': 'doesntexist'})
        response = self.client.get(bad_url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_profile(self):
        data = {
            'bio': 'my new bio',
            'location': 'The Moon'
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.json()['username'], 'testing')
        self.assertEqual(response.json()['email'], 'testing@overworld.com')
        self.assertEqual(response.json()['bio'], 'my new bio')
        self.assertEqual(response.json()['location'], 'The Moon')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class FollowTests(APITestCase):
    def setUp(self):
        friend_data = {
            'username': 'anotherUser',
            'email': 'anotherUser@overworld.com',
            'password': 'myPassword123'
        }
        my_username = create_user(self.client)['username']
        self.friend_username = create_user(self.client,
                                           data=friend_data)['username']
        self.follow_url = reverse('follow')
        self.unfollow_url = reverse('unfollow')
        self.me = CustomUser.objects.get(username=my_username)
        self.friend = CustomUser.objects.get(username=self.friend_username)
        self.client.force_authenticate(user=self.me)

    def test_follow(self):
        data = {'username': self.friend_username}
        response = self.client.post(self.follow_url, data)

        self.assertTrue(self.friend in self.me.following.all())
        self.assertTrue(self.me in self.friend.followers.all())
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_follow_nonexistant_user(self):
        data = {'username': 'doesntexist'}
        response = self.client.post(self.follow_url, data)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_unfollow(self):
        data = {'username': self.friend_username}
        # Setup me to follow friends before unfollowing
        self.client.post(self.follow_url, data)
        response = self.client.post(self.unfollow_url, data)

        self.assertFalse(self.friend in self.me.following.all())
        self.assertFalse(self.me in self.friend.followers.all())
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unfollow_user_not_being_followed(self):
        data = {'username': self.friend_username}
        response = self.client.post(self.unfollow_url, data)

        self.assertFalse(self.friend in self.me.following.all())
        self.assertFalse(self.me in self.friend.followers.all())
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unfollow_nonexistant_user(self):
        data = {'username': 'doesntexist'}
        response = self.client.post(self.unfollow_url, data)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
