from django.urls import path, include


urlpatterns = [
    path('games/', include('games.urls')),
    path('actions/', include('actions.urls')),
    path('users/', include('users.urls')),
]
