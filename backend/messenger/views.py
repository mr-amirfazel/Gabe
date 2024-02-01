from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from messenger.models import Contact, Chat
from messenger.serializers import ContactSerializer, ChatSerializer


class ContactViewSet(viewsets.GenericViewSet,
                     mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     mixins.DestroyModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        request.data['user_id'] = request.user.id
        return super().create(request, args, kwargs)

    def list(self, request, *args, **kwargs):
        request.data['user_id'] = request.user.id
        return super().list(request, args, kwargs)

    def destroy(self, request, *args, **kwargs):
        request.data['user_id'] = request.user.id
        request.data['contact_id'] = kwargs.get('contact_id')
        self.lookup_field = 'contact_id'
        return super().destroy(request, args, kwargs)

    def get_queryset(self):
        return Contact.objects.filter(user_id=self.request.user)


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
