"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typeorm_1 = require("typeorm");
const database_1 = __importDefault(require("../../database"));
const UserRepository_1 = require("../../repositories/UserRepository");
describe('Unit - User encrypt', () => {
    beforeAll(async () => {
        await (0, database_1.default)();
    });
    afterAll(async () => {
        const connection = (0, typeorm_1.getConnection)();
        await connection.close();
    });
    it('Should encrypt user password', async () => {
        const repository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        // usuário cadastrado na execução dos seeders
        const user = await repository.findOne({ email: 'user1@gmail.com' });
        const compareHash = await bcryptjs_1.default.compare('123456', user.password);
        expect(compareHash).toBe(true);
    });
});
