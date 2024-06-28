/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  contact_firstname: string;

  @IsString()
  contact_lastname: string;

  @IsString()
  contact_userId: string; // Optional: If you want to include userId in the DTO, otherwise remove this line
}
