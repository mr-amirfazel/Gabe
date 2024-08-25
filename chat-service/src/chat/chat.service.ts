/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { ChatDto } from './dto/chat.dto';
import { MessageDto } from './dto/message.dto';
import { UserService } from '../user/user.service'; // Ensure you have access to user service to get user details

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    @Inject('DATABASE_CONNECTION') private db: Db,
    private userService: UserService
  ) {}

  async createChat(createChatDto: ChatDto) {
    this.logger.log('Creating a new chat');
    
    let chatName = createChatDto.chatName || '';
    
    if (!createChatDto.isGroupChat) {
      // For one-on-one chat, set chat name based on the contact's name
      const [_, contactId] = createChatDto.members;
      const contact = await this.userService.findOne(contactId);
      chatName = `${contact.firstname} ${contact.lastname}`;
    }
    
    const chat = { ...createChatDto, createdAt: new Date(), chatId: new ObjectId().toHexString(), chatName };
    const result = await this.db.collection('chats').insertOne(chat);
    return result.insertedId;
  }

  async getChats(userId: string) {
    this.logger.log(`Fetching chats for user with id: ${userId}`);
    try {
        const chats = await this.db.collection('chats').find({ members: { $in: [userId] } }).toArray();
        
        this.logger.log(`Found ${chats.length} chats for user with id: ${userId}`);
        const updatedChats = await Promise.all(
          chats.map(async (chat) => {
            if (!chat.isGroupChat) {
              const otherUserId = chat.members.find((id: string) => id !== userId);
              const otherUser = await this.userService.findOne(otherUserId);
              if (otherUser) {
                chat.chatName = `${otherUser.firstname} ${otherUser.lastname}`;
              }
            }
            return chat;
          })
        );
  
        return updatedChats;
      } catch (error) {
        this.logger.error(`Error fetching chats for user with id: ${userId}`, error.stack);
        throw error;
      }
  }

  async createMessage(createMessageDto: MessageDto, chatId: string) {
    this.logger.log('Creating a new message');
    const message = { ...createMessageDto, createdAt: new Date(), messageId: new ObjectId().toHexString(), chatId: new ObjectId(chatId) };
    const result = await this.db.collection('messages').insertOne(message);
    return result.insertedId;
  }

  async getMessages(chatId: string) {
    this.logger.log(`Fetching messages for chat with id: ${chatId}`);
    return this.db.collection('messages').find({ chatId: new ObjectId(chatId) }).toArray();
  }

  async deleteChat(chatId: string) {
    this.logger.log(`Deleting chat with id: ${chatId}`);
    try {
      const chatObjectId = new ObjectId(chatId);
      await this.db.collection('chats').deleteOne({ _id: chatObjectId });
      await this.db.collection('messages').deleteMany({ chatId: chatObjectId });
      this.logger.log(`Deleted chat and its messages for chatId: ${chatId}`);
      return {message : `Deleted chat and its messages for chatId: ${chatId}`}
    } catch (error) {
      this.logger.error(`Error deleting chat and its messages for chatId: ${chatId}`, error.stack);
      throw error;
    }
  }

  async deleteMessage(messageId: string){
    this.logger.log(`Deleting message with id: ${messageId}`);
    try {
      await this.db.collection('messages').deleteOne({ messageId: new ObjectId(messageId) });
      this.logger.log(`Deleted chat and its messages for messageID: ${messageId}`);
      return {message : `deleted message with id: ${messageId} successfully`}
    } catch (error) {
      this.logger.error(`Error deleting message : ${messageId}`, error.stack);
      throw error;
    }
  }
}
