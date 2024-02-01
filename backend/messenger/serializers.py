from rest_framework import serializers

from messenger.models import Contact, Chat, ChatMembership


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('id', 'user_id', 'contact_id', 'contact_name')
        read_only_fields = ['id', 'user_id']


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'name', 'created_at')
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        chat = super().create(validated_data)
        chat_membership = ChatMembership.objects.create(chat_id=chat, user_id=self.context['request'].user)
        chat_membership.save()
        return chat


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'chat_id', 'sender_id', 'receiver_id', 'content', 'created_at')
        read_only_fields = ['id']
