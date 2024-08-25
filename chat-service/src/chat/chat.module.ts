import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { DatabaseModule } from '../db/database.module';
import { UserModule } from 'src/user/user.module';
// import { ChatGateway } from 'src/socket/socket/socket.gateway';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
