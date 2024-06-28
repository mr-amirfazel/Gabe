/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/contact.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users/:userId/contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getContacts(@Param('userId') userId: string) {
    return this.contactService.getContacts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addContact(@Param('userId') userId: string, @Body() createContactDto: CreateContactDto) {
    return this.contactService.addContact(userId, createContactDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':contactId')
  removeContact(@Param('userId') userId: string, @Param('contactId') contactId: string) {
    return this.contactService.removeContact(userId, contactId);
  }
}
