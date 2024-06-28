/* eslint-disable prettier/prettier */
import { IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';
// import { Types } from 'mongoose';

export class ChatDto {
  @IsArray()
  members: string[];

  @IsBoolean()
  isGroupChat: boolean;

  @IsOptional()
  @IsString()
  chatName?: string;
}
