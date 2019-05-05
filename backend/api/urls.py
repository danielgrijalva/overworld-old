from django.urls import path
from . import views


urlpatterns = [
    path('games/<str:guid>/', views.get_game),
    path('log/', views.log),
    path('search/<str:name>', views.search_game),
    path('screenshots/<str:guid>', views.get_screenshots),
    path('games/country/<str:publisher_id>', views.get_game_country),
]
