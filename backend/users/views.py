from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework. response import Response
from rest_framework.exceptions import PermissionDenied
from knox.models import AuthToken
from .models import CustomUser
from .serializers import UserSerializer, ProfileSerializer, RegisterSerializer, LoginSerializer


class RegisterView(generics.GenericAPIView):
    """Endpoint for signing up to Overworld.
    
    All authentication related functionality in Overworld is handled by
    django-rest-knox. 

    Returns:
        user: object with user-related data.
        token: JWT token for handling the session in the browser.
    """
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user_data = UserSerializer(user, context=self.get_serializer_context())

        return Response({
            'user': user_data.data,
            'token': AuthToken.objects.create(user)[1]
        })


class LoginView(generics.GenericAPIView):
    """Endpoint for login in to Overworld.
    
    All authentication related functionality in Overworld is handled by
    django-rest-knox. 

    Returns:
        user: object with user-related data.
        token: JWT token for handling the session in the browser.
    """    
    serializer_class = LoginSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user_data = UserSerializer(user, context=self.get_serializer_context())

        return Response({
            'user': user_data.data,
            'token': AuthToken.objects.create(user)[1]
        })


class UserView(generics.RetrieveAPIView):
    """Endpoint for obtaining basic user data.

    Returns:
        user: object with user ID, username and email.
    """
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ProfileView(generics.GenericAPIView):
    """Endpoint for obtaining a user's profile.
    
    The profile consists of the user's activity, faborite games, bio, reviews,
    contact information, stats, lists, followers and other stuff. This endpoint
    accepts both GET and POST methods.
    """
    def post(self, request, *args, **kwargs):
        """Method for updating your profile."""
        me = get_object_or_404(CustomUser, id=request.user.id)

        for key in request.data:
          setattr(me, key, request.data[key])

        me.save()
        serializer = ProfileSerializer(me).data

        return Response(serializer)

    def get(self, request, *args, **kwargs):
        """Method for getting the profile."""
        user = get_object_or_404(CustomUser, username=kwargs['username'])
        serializer = ProfileSerializer(user).data

        if not request.user.is_anonymous:
            # handle follow logic for showing the following/follow/unfollow
            # buttons in the frontend
            me = CustomUser.objects.get(id=request.user.id)
            serializer['me'] = UserSerializer(me).data
            if user in me.following.all():
                serializer['followingUser'] = True

        return Response(serializer)


class FollowView(generics.GenericAPIView):
    """Endpoint to follow a user.
    
    This adds a user to the current user's `following` field, and adds the
    current user to that user's `followers` field. These fields are a 
    many-to-many relationship.

    The user calling this endpoint must be authenticated.

    Args:
        username: the user to follow.
    """
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        me = CustomUser.objects.get(id=request.user.id)
        user = CustomUser.objects.get(username=request.data['username'])

        me.following.add(user)
        user.followers.add(me)

        return Response([])


class UnfollowView(generics.GenericAPIView):
    """Endpoint to unfollow a user.
    
    This removes a user from the current user's `following` field, and removes
    the current user from that user's `followers` field. These fields are a 
    many-to-many relationship.

    The user calling this endpoint must be authenticated.

    Args:
        username: the user to unfollow.
    """    
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        me = CustomUser.objects.get(id=request.user.id)
        user = CustomUser.objects.get(username=request.data['username'])

        me.following.remove(user)
        user.followers.remove(me)

        return Response([])
