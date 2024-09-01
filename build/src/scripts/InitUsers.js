"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const DataSeed_1 = require("../database/seeders/DataSeed");
const index_1 = __importDefault(require("../database/index"));
require("dotenv/config");
class InitUsersRun {
    static async run() {
        var _a;
        try {
            const connection = await (0, index_1.default)();
            console.log('\n== [Database connection] ==');
            const entitiesExists = await DataSeed_1.DataSeed.verifyEntities();
            if (entitiesExists) {
                console.log('\n== User already exists  ==\n');
            }
            else {
                await DataSeed_1.DataSeed.createUsers();
                console.log('\n== [Users created successfully] ==');
            }
            await connection.close();
            console.log('\n== [Connection close] ==\n');
        }
        catch (error) {
            console.log('\nError:', (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
        }
    }
}
InitUsersRun.run();
