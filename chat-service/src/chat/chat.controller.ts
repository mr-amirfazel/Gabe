/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { MessageDto } from './dto/message.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  createChat(@Body() createChatDto: ChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @Get(':userId')
  getChats(@Param('userId') userId: string) {
    return this.chatService.getChats(userId);
  }

  @Post(':chatId/messages')
  createMessage(@Param('chatId') chatId: string, @Body() createMessageDto: MessageDto) {
    // const chatID = new ObjectId(chatId)
    return this.chatService.createMessage({ ...createMessageDto}, chatId);
  }

  @Get(':chatId/messages')
  getMessages(@Param('chatId') chatId: string) {
    return this.chatService.getMessages(chatId);
  }

  @Delete(':chatId')
  deleteChat(@Param('chatId') chatId: string) {
    return this.chatService.deleteChat(chatId)
  }

  @Delete(':chatId/messages/:messageId')
  deleteMessage(@Param('messageId') messageId: string) {
    return this.chatService.deleteMessage(messageId)
  }
}
