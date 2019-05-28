from django.urls import path, include
from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from . import views


urlpatterns = [
    path('games/<int:guid>/', views.get_game),
    path('games/backdrop/<int:guid>/', views.get_backdrop),
    path('games/popular/', views.get_popular_games),
    path('actions/', views.Actions.as_view()),
    path('actions/log/', views.Log.as_view()),
    path('actions/like/', views.Like.as_view()),
    path('actions/wishlist/', views.Wishlist.as_view()),
    path('actions/backlog/', views.Backlog.as_view()),
    path('actions/ratings/', views.Rate.as_view()),
    path('search/<str:name>', views.search_game),
    path('users/', include('users.urls')),
]
