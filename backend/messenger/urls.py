from django.urls import path, include

from messenger.views import ContactViewSet, ChatViewSet

contact_routes = [
    path('contacts/', ContactViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path(r'contacts/<int:contact_id>/', ContactViewSet.as_view({
        'delete': 'destroy'
    })),
]

chat_routes = [
    path('chats/', ChatViewSet.as_view({
        'get': 'list',
        'post': 'create',
    })),
    path('chats/<int:chat_id>/', ChatViewSet.as_view({
        'get': 'retrieve',
        'delete': 'destroy',
    })),
    path('chats/<int:chat_id>/messages/<int:message_id>/', ChatViewSet.as_view({
        'delete': 'delete_message',
    })),
]

urlpatterns = [
    path('', include(contact_routes)),
    path('', include(chat_routes)),
]
