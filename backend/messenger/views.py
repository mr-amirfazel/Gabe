from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from messenger.models import Contact, Chat, ChatMembership
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
    permission_classes = [IsAuthenticated]
    serializer_class = ChatSerializer

    def destroy(self, request, *args, **kwargs):
        self.lookup_url_kwarg = 'chat_id'
        return super().destroy(request, args, kwargs)

    @action(methods=['delete'], detail=False)
    def delete_message(self, request):
        try:
            chat = self.get_queryset().get(pk=request.data['chat_id'])
        except Chat.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        chat.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        return Chat.objects.filter(pk__in=ChatMembership.objects.filter(user_id=self.request.user).values('chat_id'))
