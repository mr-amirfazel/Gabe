from django.db import models


class Contact(models.Model):
    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='user_id')
    contact_id = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='contact_id')
    contact_name = models.CharField(max_length=50, null=False, blank=True)

    class Meta:
        unique_together = ('user_id', 'contact_id',)


class Chat(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)


class ChatMembership(models.Model):
    chat_id = models.ForeignKey('messenger.Chat', on_delete=models.CASCADE)
    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('chat_id', 'user_id',)


class Message(models.Model):
    chat_id = models.ForeignKey('messenger.Chat', on_delete=models.CASCADE)
    sender_id = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='sender_id')
    receiver_id = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='receiver_id')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
