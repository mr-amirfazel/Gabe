/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        const client = new MongoClient(
          'mongodb+srv://fazel:gabeAuth@gabe.uomwmlz.mongodb.net/gabe?retryWrites=true&w=majority&appName=gabe'
        );
        await client.connect();
        return client.db('gabe');
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
