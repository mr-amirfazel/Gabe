/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class MessageDto {
  @IsString()
  senderId: Types.ObjectId;

  @IsString()
  content: string;

//   @IsString()
//   chatId: Types.ObjectId;
}
