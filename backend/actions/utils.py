from rest_framework import permissions

class AllowAnyGet(permissions.BasePermission): 

    def has_permission(self, request, view):
        # allow all GET requests
        if request.method == 'GET':
            return True

        # Otherwise, only allow authenticated requests
        return request.user and request.user.is_authenticated
        