from django.urls import path
from . import views

urlpatterns = [
    path('games/<int:igdb>/', views.get_game)
]
