"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const typeorm_1 = require("typeorm");
const app_1 = require("../../app");
const database_1 = __importDefault(require("../../database"));
describe('Auth', () => {
    beforeAll(async () => {
        await (0, database_1.default)();
    });
    afterAll(async () => {
        const connection = (0, typeorm_1.getConnection)();
        await connection.close();
    });
    it('Server is running', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/');
        expect(response.body.message).toBe('Welcome api-iceCreamShop');
    });
    it('Should be able to login with existing user and a token must be returned with status 200', async () => {
        // usuário criado na execução dos seeders
        const loginUser = {
            email: 'user1@gmail.com',
            password: '123456',
        };
        const response = await (0, supertest_1.default)(app_1.app).post('/signin').send(loginUser);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
    it('Should not be able to login with a non-existing user', async () => {
        const loginNotExistingUser = {
            email: 'test@test.com',
            password: 'test',
        };
        const response = await (0, supertest_1.default)(app_1.app).post('/signin').send(loginNotExistingUser);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Credenciais incorretas!');
    });
});
