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

    // Fetch contacts
    const contacts = await this.db.collection('contacts')
      .find({ userId: new ObjectId(userId) })
      .toArray();

    // Extract user IDs from contacts
    const userIds = contacts.map(contact => new ObjectId(contact.contact_userId));

    this.logger.log("userIDS ", userIds)

    // Fetch user data for each contact
    const users = await this.db.collection('users')
      .find({ _id: { $in: userIds } })
      .toArray();

      this.logger.log(users)

    // Map users by their IDs for quick lookup
    const usersMap = new Map(users.map(user => [user?._id?.toString(), user]));

    // Combine contacts with user data
    const contactsWithUsers = contacts.map(contact => ({
      ...contact,
      user: usersMap.get(contact?.contact_userId?.toString()) || null
    }));

    return contactsWithUsers;
  }

  async addContact(userId: string, createContactDto: CreateContactDto) {
    this.logger.log(`Adding new contact for user with id: ${userId}`);
    const contact = { ...createContactDto, userId: new ObjectId(userId) };
    const result = await this.db.collection('contacts').insertOne(contact);
    return result.insertedId;
  }

  async removeContact(userId: string, contactId: string) {
    this.logger.log(`Removing contact with id: ${contactId} for user with id: ${userId}`);
    await this.db.collection('contacts').deleteOne({ _id: new ObjectId(contactId), userId: new ObjectId(userId) });
  }
}
