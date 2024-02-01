from rest_framework import serializers

from messenger.models import Contact, Chat


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('id', 'user_id', 'contact_id', 'contact_name')


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'created_at')


class ChatMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'chat_id', 'user_id')


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'chat_id', 'sender_id', 'receiver_id', 'content', 'created_at')
