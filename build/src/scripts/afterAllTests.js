"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv/config");
async function dropDatabase() {
    const client = new pg_1.Client({
        connectionString: process.env.DATABASE_URL_TEST,
    });
    await client.connect();
    await client.query('DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC');
    await client.end();
    return process.env.BD_DATABASE_TEST || '';
}
dropDatabase()
    .then((db) => console.log(`Test database ${db} deleted successfully`))
    .catch(err => console.log('Error: ', err));
