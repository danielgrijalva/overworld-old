from django.urls import path
from . import views


urlpatterns = [
    path('', views.Actions.as_view()),
    path('log/', views.Log.as_view()),
    path('like/', views.Like.as_view()),
    path('wishlist/', views.Wishlist.as_view()),
    path('backlog/', views.Backlog.as_view()),
    path('ratings/', views.Rate.as_view())
]
