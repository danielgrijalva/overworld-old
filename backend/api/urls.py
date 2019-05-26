from django.urls import path, include
from django.conf.urls import url
from . import views
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('games/<str:guid>/', views.get_game, name='games'),
    path('actions/', views.Actions.as_view(), name='actions'),
    path('actions/log/', views.Log.as_view(), name='actions/log'),
    path('actions/unlog/', views.Unlog.as_view(), name='actions/unlog'),
    path('actions/like/', views.Like.as_view(), name='actions/like'),
    path('actions/unlike/', views.Unlike.as_view(), name='actions/unlike'),
    path('actions/wishlist/', views.Wishlist.as_view(), name='actions/wishlist'),
    path('actions/remove-wishlist/', views.RemoveWishlist.as_view(), name='actions/remove-wishlist'),
    path('actions/backlog/', views.Backlog.as_view(), name='actions/backlog'),
    path('actions/remove-backlog/', views.RemoveBacklog.as_view(), name='actions/remove-backlog'),
    path('actions/ratings/', views.Rate.as_view(), name='actions/ratings'),
    path('search/<str:name>', views.search_game, name='search'),
    path('screenshots/<str:guid>', views.get_screenshots, name='screenshots'),
    path('games/country/<str:publisher_id>', views.get_game_country, name='games/country'),
    path('popular/', views.get_popular_games, name='popular'),
    path('igdb/cover/<int:cover_id>', views.get_igdb_cover, name='igdb/cover'),
    path('users/', include('users.urls'), name='users'),
]
