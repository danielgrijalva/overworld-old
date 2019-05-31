from rest_framework import generics, permissions
from rest_framework. response import Response
from knox.models import AuthToken
from .models import CustomUser
from .serializers import UserSerializer, ProfileSerializer, RegisterSerializer, LoginSerializer


class RegisterView(generics.GenericAPIView):
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
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ProfileView(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        user = CustomUser.objects.get(username=kwargs['username'])
        serializer = ProfileSerializer(user).data

        if not request.user.is_anonymous:
            me = CustomUser.objects.get(id=request.user.id)
            serializer['me'] = UserSerializer(me).data
            if user in me.following.all():
                serializer['following'] = True

        return Response(serializer)


class FollowView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        me = CustomUser.objects.get(id=request.user.id)
        user = CustomUser.objects.get(username=request.data['username'])

        me.following.add(user)

        return Response([])


class UnfollowView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        me = CustomUser.objects.get(id=request.user.id)
        user = CustomUser.objects.get(username=request.data['username'])

        me.following.remove(user)

        return Response([])
