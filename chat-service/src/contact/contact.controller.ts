/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/contact.dto';

@Controller('users/:userId/contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  getContacts(@Param('userId') userId: string) {
    return this.contactService.getContacts(userId);
  }

  @Post()
  addContact(@Param('userId') userId: string, @Body() createContactDto: CreateContactDto) {
    return this.contactService.addContact(userId, createContactDto);
  }

  @Delete(':contactId')
  removeContact(@Param('userId') userId: string, @Param('contactId') contactId: string) {
    return this.contactService.removeContact(userId, contactId);
  }
}
