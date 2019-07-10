from django.urls import path
from . import views


urlpatterns = [
    path('', views.Actions.as_view(), name='get-actions'),
    path('log/', views.Log.as_view(), name='log-game'),
    path('like/', views.Like.as_view(), name='like-game'),
    path('wishlist/', views.Wishlist.as_view(), name='add-to-wishlist'),
    path('backlog/', views.Backlog.as_view(), name='add-to-backlog'),
    path('ratings/', views.Rate.as_view(), name='rate-game'),
    path('journal/', views.JournalView.as_view(), name='journal'),
    path('favorites/', views.FavoriteGames.as_view(), name='get-favorites'),    
    path('favorites/add/', views.AddFavoriteGame.as_view(), name='add-favorite'),
    path('favorites/remove/', views.RemoveFavoriteGame.as_view(), name='remove-favorite'),
]
