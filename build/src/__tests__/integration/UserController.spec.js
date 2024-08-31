"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const typeorm_1 = require("typeorm");
const app_1 = require("../../app");
const database_1 = __importDefault(require("../../database"));
const User_1 = require("../../entities/User");
const UserRepository_1 = require("../../repositories/UserRepository");
// id inexistente
const idInexist = 9999;
// usuário criado na execução dos seeders
const loginUser = {
    email: 'user1@gmail.com',
    password: '123456',
};
const createUser = {
    name: 'User example',
    email: 'user@example.com',
    password: '123456',
    role: User_1.EnumRoleUser.SUPER,
};
const editedUser = {
    name: 'User example edited',
    email: 'user@example_edit.com',
    password: '123456',
    role: User_1.EnumRoleUser.NORMAL,
};
let token;
let userId;
describe('Users', () => {
    beforeAll(async () => {
        await (0, database_1.default)();
        const Login = await (0, supertest_1.default)(app_1.app).post('/signin').send(loginUser);
        token = Login.body.token;
    });
    afterAll(async () => {
        const connection = (0, typeorm_1.getConnection)();
        await connection.close();
    });
    // testes para criação de usuário
    it('Should be able to create a new user and return 201', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/users')
            .set('Authorization', `bearer ${token}`)
            .send(createUser);
        userId = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(createUser.name);
        expect(response.body.email).toBe(createUser.email);
        expect(response.body.role).toBe(createUser.role);
    });
    it('Should returns 400 beacause there is no user name', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/users')
            .set('Authorization', `bearer ${token}`)
            .send({
            email: 'user@example2.com.br',
            password: '123456',
            role: User_1.EnumRoleUser.SUPER,
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Name is required');
    });
    it('Should returns 400 beacause there is no user email', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/users')
            .set('Authorization', `bearer ${token}`)
            .send({
            name: 'User example 2',
            password: '123456',
            role: User_1.EnumRoleUser.SUPER,
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('E-mail is required');
    });
    it('Should returns 400 beacause there is no valid user email', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/users')
            .set('Authorization', `bearer ${token}`)
            .send({
            name: 'User example 2',
            email: 'email_invalid.com',
            password: '123456',
            role: User_1.EnumRoleUser.SUPER,
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Should be e-mail');
    });
    it('Should returns 400 beacause there is no user password', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/users')
            .set('Authorization', `bearer ${token}`)
            .send({
            name: 'User example 2',
            email: 'user@example2.com.br',
            role: User_1.EnumRoleUser.SUPER,
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Password is required');
    });
    it('Should returns 400 beacause there is no user role', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/users')
            .set('Authorization', `bearer ${token}`)
            .send({
            name: 'User example 2',
            email: 'user@example2.com.br',
            password: '123456',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Type user is required');
    });
    it('Should returns 400 beacause there is no valid user role', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/users')
            .set('Authorization', `bearer ${token}`)
            .send({
            name: 'User example 2',
            email: 'user@example2.com.br',
            password: '123456',
            role: 'invalid',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('role must be one of the following values: SUPER, NORMAL, EMPLOYEE');
    });
    it('Should not be able to create a user with exists email and return 400', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/users')
            .set('Authorization', `bearer ${token}`)
            .send(createUser);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User already exists');
    });
    // testes para atualização de usuário
    it('Should be able to edit a existing user and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/users/${userId}`)
            .set('Authorization', `bearer ${token}`)
            .send(editedUser);
        const repository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        const userUpdated = await repository.findOne({ id: userId });
        expect(response.status).toBe(200);
        expect(userUpdated.name).toBe(editedUser.name);
        expect(userUpdated.email).toBe(editedUser.email);
        expect(userUpdated.password).not.toBe(editedUser.password);
        expect(userUpdated.role).toBe(editedUser.role);
        expect(response.body.message).toBe('User updated successfully');
    });
    it('Should return 400 when update user by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/users/aaa`)
            .set('Authorization', `bearer ${token}`)
            .send(editedUser);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    it('Should return 400 for update missing id user', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/users/${idInexist}`)
            .set('Authorization', `bearer ${token}`)
            .send(editedUser);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User does not exist');
    });
    // testes para visualização de usuário por id
    it('Should be able to get a user by Id and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get(`/users/${userId}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(editedUser.name);
        expect(response.body.email).toBe(editedUser.email);
        expect(response.body.role).toBe(editedUser.role);
    });
    it('Should return 400 for searching missing id user', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get(`/users/${idInexist}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User does not exist');
    });
    it('Should return 400 when searching user by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get(`/users/aaa`).set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    // testes para visualização de todos os usuários
    it('Should be able to get all users and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/users').set('Authorization', `bearer ${token}`);
        const repository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        const allUsers = await repository.find();
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(allUsers.length);
    });
    // testes para deleção de usuário
    it('Should be able to delete a user and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/users/${userId}`)
            .set('Authorization', `bearer ${token}`);
        const repository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        const deleted = await repository.findOne({ id: userId });
        expect(response.status).toBe(200);
        expect(deleted).toBeUndefined();
        expect(response.body.message).toBe('User deleted successfully');
    });
    it('Should return 400 when delete user by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/users/aaa`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    it('Should return 400 for delete missing id user', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/users/${idInexist}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User does not exist');
    });
});
