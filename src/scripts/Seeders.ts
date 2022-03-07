import { DataSeed } from '../database/seeders/DataSeed';
import createConnection from '../database/index';
import 'dotenv/config';

class SeederRun {
  public static async run() {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
      try {
        const connection = await createConnection();
        console.log('\n== [Database connection] ==');

        const entitiesExists = await DataSeed.verifyEntities();
        if (entitiesExists) {
          console.log('\n== Database is already populated ==\n');
          await connection.query(`DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC`);
          console.log('== Database initialized ==\n');
        }
        await connection.runMigrations();
        console.log('\n== [Migrations run sucessfully] ==');

        await DataSeed.createUsers();
        console.log('\n== [Seeders run successfully] ==');

        await connection.close();
        console.log('\n== [Connection close] ==\n');
      } catch (error) {
        console.log('\nError:', error);
      }
    } else {
      console.log('Seeders should only be run in local environments');
    }
  }
}

SeederRun.run();
