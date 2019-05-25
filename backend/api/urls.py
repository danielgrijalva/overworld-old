from django.urls import path, include
from django.conf.urls import url
from . import views
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('games/<str:guid>/', views.get_game),
    path('actions/', views.Actions.as_view()),
    path('actions/log/', views.Log.as_view()),
    path('actions/unlog/', views.Unlog.as_view()),
    path('actions/like/', views.Like.as_view()),
    path('actions/unlike/', views.Unlike.as_view()),
    path('actions/wishlist/', views.Wishlist.as_view()),
    path('actions/remove-wishlist/', views.RemoveWishlist.as_view()),
    path('actions/backlog/', views.Backlog.as_view()),
    path('actions/remove-backlog/', views.RemoveBacklog.as_view()),
    path('search/<str:name>', views.search_game),
    path('screenshots/<str:guid>', views.get_screenshots),
    path('games/country/<str:publisher_id>', views.get_game_country),
    path('popular/', views.get_popular_games),
    path('igdb/cover/<int:cover_id>', views.get_igdb_cover),
    path('users/', include('users.urls')),
]
