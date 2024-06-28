/* eslint-disable prettier/prettier */
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  async getContacts(userId: string) {
    this.logger.log(`Fetching contacts for user with id: ${userId}`);
    return this.db.collection('contacts').find({ userId: new ObjectId(userId) }).toArray();
  }

  async addContact(userId: string, createContactDto: CreateContactDto) {
    this.logger.log(`Adding new contact for user with id: ${userId}`);
    const contact = { ...createContactDto, userId: new ObjectId(userId) };
    const result = await this.db.collection('contacts').insertOne(contact);
    return result.insertedId
  }

  async removeContact(userId: string, contactId: string) {
    this.logger.log(`Removing contact with id: ${contactId} for user with id: ${userId}`);
    await this.db.collection('contacts').deleteOne({ _id: new ObjectId(contactId), userId: new ObjectId(userId) });
  }
}
