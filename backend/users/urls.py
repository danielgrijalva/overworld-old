from django.urls import path, include
from knox import views as knox_views
from .views import RegisterView, LoginView, UserView, ProfileView, FollowView, UnfollowView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view(), name='knox_login'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path('user/', UserView.as_view()),
    path('profile/<str:username>', ProfileView.as_view()),
    path('follow/', FollowView.as_view()),
    path('unfollow/', UnfollowView.as_view())

]
