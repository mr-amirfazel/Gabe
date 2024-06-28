/* eslint-disable prettier/prettier */
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}
  private readonly logger = new Logger(UserService.name);

  async findAll() {
    return this.db.collection('users').find().toArray();
  }

  async findOne(id: string) {
    return this.db.collection('users').findOne( { _id: new ObjectId(id) });
  }

  async update(id: string, updateUserDto: any) {
    await this.db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: updateUserDto });
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.db.collection('users').deleteOne({ _id: new ObjectId(id) });
  }

  async search(keyword: string) {
    if (!keyword) {
      this.logger.warn('No keyword provided, returning all users');
      return this.db.collection('users').find().toArray();
    }

    const regex = new RegExp(keyword, 'i'); // 'i' for case-insensitive search
    const query = {
      $or: [
        { firstname: { $regex: regex } },
        { lastname: { $regex: regex } },
        { username: { $regex: regex } },
      ],
    };

    this.logger.debug(`Query: ${JSON.stringify(query)}`, 'UserService');

    return this.db.collection('users').find(query).toArray();
  }
}
