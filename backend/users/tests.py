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

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_profile(self):
        data = {
            'bio': 'my new bio',
            'location': 'The Moon'
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)


class FollowTests(APITestCase):
    def setUp(self):
        friend_data = {
            'username': 'anotherUser',
            'email': 'anotherUser@overworld.com',
            'password': 'myPassword123'
        }
        my_username = create_user(self.client)['username']
        self.friend = create_user(self.client, data=friend_data)['username']
        self.follow_url = reverse('follow')
        self.unfollow_url = reverse('unfollow')
        self.me = CustomUser.objects.get(username=my_username)
        self.client.force_authenticate(user=self.me)        

    def test_follow(self):
        data = {'username': self.friend}
        response = self.client.post(self.follow_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unfollow(self):
        data = {'username': self.friend}
        response = self.client.post(self.unfollow_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
                