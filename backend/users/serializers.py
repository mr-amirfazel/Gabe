from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'phone', 'avatar', 'bio')
