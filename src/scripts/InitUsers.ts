/* eslint-disable no-console */
import { DataSeed } from '../database/seeders/DataSeed';
import createConnection from '../database/index';
import 'dotenv/config';

class InitUsersRun {
  public static async run() {
    try {
      const connection = await createConnection();
      console.log('\n== [Database connection] ==');

      const entitiesExists = await DataSeed.verifyEntities();
      if (entitiesExists) {
        console.log('\n== User already exists  ==\n');
      } else {
        await DataSeed.createUsers();
        console.log('\n== [Users created successfully] ==');
      }
      await connection.close();
      console.log('\n== [Connection close] ==\n');
    } catch (error) {
      console.log('\nError:', error?.message ?? error);
    }
  }
}

InitUsersRun.run();
