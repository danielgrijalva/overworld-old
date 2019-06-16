from django.urls import path, include
from knox import views as knox_views
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view()),
    path('login/', views.LoginView.as_view(), name='knox_login'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path('user/', views.UserView.as_view()),
    path('profile/<str:username>', views.ProfileView.as_view()),
    path('follow/', views.FollowView.as_view()),
    path('unfollow/', views.UnfollowView.as_view())
]
