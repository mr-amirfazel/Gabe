/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://fazel:gabeAuth@gabe.uomwmlz.mongodb.net/gabe?retryWrites=true&w=majority&appName=gabe'),
    UserModule,
    ContactModule,
    ChatModule,
    AuthModule,
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
