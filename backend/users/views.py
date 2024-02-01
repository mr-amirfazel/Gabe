from rest_framework import viewsets, mixins
from rest_framework.decorators import action

from users.models import User
from users.serializers import UserSerializer


class UserViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(methods=['post'], detail=False)
    def login(self, request):
        pass

    @action(methods=['get'], detail=False)
    def search(self, request):
        pass
