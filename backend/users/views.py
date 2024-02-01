from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response

from users.models import User
from users.serializers import UserSerializer


class UserViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def destroy(self, request, *args, **kwargs):
        self.lookup_url_kwarg = 'user_id'
        return super().destroy(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        self.lookup_url_kwarg = 'user_id'
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        self.lookup_url_kwarg = 'user_id'
        return super().update(request, *args, **kwargs)

    @action(methods=['post'], detail=False)
    def login(self, request):
        pass

    @action(methods=['get'], detail=False)
    def search(self, request):
        username = request.query_params.get('username')
        users = User.objects.filter(username__contains=username)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
