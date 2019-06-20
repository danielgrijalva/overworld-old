from django.urls import path, include
from knox import views as knox_views
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='knox-login'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox-logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox-logoutall'),
    path('user/', views.UserView.as_view(), name='get-user'),
    path('profile/<str:username>', views.ProfileView.as_view(), name='get-profile'),
    path('follow/', views.FollowView.as_view(), name='follow'),
    path('unfollow/', views.UnfollowView.as_view(), name='unfollow')
]
