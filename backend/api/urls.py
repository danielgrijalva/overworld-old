from django.urls import path
from . import views


urlpatterns = [
    path('games/<int:igdb>/', views.get_game),
    path('log/', views.log),
    path('search/<str:name>', views.search_game),
    path('screenshots/<str:guid>', views.get_screenshots)
]
