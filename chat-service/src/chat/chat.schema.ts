/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  chatId: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ type: [Types.ObjectId], required: true })
  members: Types.ObjectId[];

  @Prop({ required: true })
  isGroupChat: boolean;

  @Prop()
  chatName?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
