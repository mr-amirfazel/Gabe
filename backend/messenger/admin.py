from django.contrib import admin

from messenger.models import Contact, Chat, ChatMembership, Message

# Register your models here.
admin.site.register(Contact)
admin.site.register(Chat)
admin.site.register(ChatMembership)
admin.site.register(Message)
