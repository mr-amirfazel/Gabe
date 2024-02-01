from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from users.views import UserViewSet

user_routes = [
    # TODO: add login
    path('register', UserViewSet.as_view({
        'post': 'create'
    })),
    path('users/', UserViewSet.as_view({
        'get': 'search',
        'post': 'login'
    })),
    path(r'users/<int:user_id>/', UserViewSet.as_view({
        'get': 'retrieve',
        'patch': 'update',
        'delete': 'destroy'
    })),
]

urlpatterns = [
    # routes for obtaining/refreshing jwt token
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(user_routes)),
]
