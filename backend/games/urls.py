from django.urls import path
from . import views


urlpatterns = [
    path('popular/', views.get_popular_games, name='get-popular'),
    path('multi/', views.get_games, name='get-games'),
    path('<str:slug>/', views.get_game, name='get-game'),
    path('search/<str:name>', views.search_game, name='search-game'),
    path('backdrop/<int:guid>/', views.get_backdrop, name='get-backdrop')
]
