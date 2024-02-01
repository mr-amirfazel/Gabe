from django.urls import path, include

from users.views import UserViewSet

user_routes = [
    # TODO: add login
    path('register', UserViewSet.as_view({
        'post': 'create'
    })),
    path('users/', UserViewSet.as_view({
        'get': 'search',
        'post': 'create'
    })),
    path(r'users/<int:pk>/', UserViewSet.as_view({
        'get': 'retrieve',
        'patch': 'update',
        'delete': 'destroy'
    })),
]

urlpatterns = [
    # routes for obtaining/refreshing jwt token
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(user_routes)),
]
