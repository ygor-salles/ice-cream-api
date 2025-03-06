"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const DataSeed_1 = require("../database/seeders/DataSeed");
const index_1 = __importDefault(require("../database/index"));
require("dotenv/config");
class SeederRun {
    static async run() {
        if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
            try {
                const connection = await (0, index_1.default)();
                console.log('\n== [Database connection] ==');
                const entitiesExists = await DataSeed_1.DataSeed.verifyEntities();
                if (entitiesExists) {
                    console.log('\n== Database is already populated ==\n');
                    await connection.query(`DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC`);
                    console.log('== Database initialized ==\n');
                }
                await connection.runMigrations();
                console.log('\n== [Migrations run sucessfully] ==');
                await DataSeed_1.DataSeed.createUsers();
                await DataSeed_1.DataSeed.createClients();
                await DataSeed_1.DataSeed.createProducts();
                await DataSeed_1.DataSeed.createProviders();
                await DataSeed_1.DataSeed.createPayments();
                await DataSeed_1.DataSeed.createSales();
                console.log('\n== [Seeders run successfully] ==');
                await connection.close();
                console.log('\n== [Connection close] ==\n');
            }
            catch (error) {
                console.log('\nError:', error);
            }
        }
        else {
            console.log('Seeders should only be run in local environments');
        }
    }
}
SeederRun.run();
