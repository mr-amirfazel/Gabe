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
          process.env.DATABSE_URI
        );
        await client.connect();
        return client.db(process.env.DATABASE_NAME);
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
