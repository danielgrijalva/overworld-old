from django.urls import path
from . import views


urlpatterns = [
    path('<int:guid>/', views.get_game),
    path('search/<str:name>', views.search_game),
    path('backdrop/<int:guid>/', views.get_backdrop),
    path('popular/', views.get_popular_games)
]
