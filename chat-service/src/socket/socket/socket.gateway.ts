/* eslint-disable prettier/prettier */
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { Types } from 'mongoose';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  // When a client connects, we add them to a specific chat room
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, chatId: string): void {
    Logger.log("client joined to", chatId, typeof(chatId))
    client.join(chatId);
    client.emit('joinedRoom', chatId);  // Send an acknowledgment to the client
  }

  // When a message is sent, store it in the DB and emit it to the specific chat room
  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, { chatId, messageContent, senderId }: { chatId: string; messageContent: string; senderId: Types.ObjectId }) {
    const newMessage = {
      content: messageContent,
      senderId
    };
    
    // Save the message to the database
    const savedMessage = await this.chatService.createMessage(newMessage, chatId);
    Logger.log('new message', savedMessage)
    // Emit the saved message to the specific chat room
    this.server.to(chatId).emit('receiveMessage', savedMessage);
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
}
