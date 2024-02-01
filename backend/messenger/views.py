from rest_framework import viewsets, mixins
from rest_framework.decorators import action

from messenger.models import Contact, Chat
from messenger.serializers import ContactSerializer, ChatSerializer


class ContactViewSet(viewsets.GenericViewSet,
                     mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     mixins.DestroyModelMixin):
    queryset = Contact.objects.all()  # TODO: override queryset based on user
    serializer_class = ContactSerializer


class ChatViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin):
    queryset = Chat.objects.all()  # TODO: override queryset based on user
    serializer_class = ChatSerializer

    @action(methods=['delete'], detail=False)
    def delete_message(self, request):
        pass
