"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const typeorm_1 = require("typeorm");
const app_1 = require("../../app");
const database_1 = __importDefault(require("../../database"));
const ClientRepository_1 = require("../../repositories/ClientRepository");
// id inexistente
const idInexist = 9999;
// usuário criado na execução dos seeders
const loginUser = {
    email: 'user1@gmail.com',
    password: '123456',
};
const createClient = {
    name: 'Client example',
    phone: '35984987600',
    debit: 25.5,
};
const editedClient = {
    name: 'Client example edited',
    phone: '35984987611',
    debit: 30,
};
let token;
let clientId;
describe('Clients', () => {
    beforeAll(async () => {
        await (0, database_1.default)();
        const Login = await (0, supertest_1.default)(app_1.app).post('/signin').send(loginUser);
        token = Login.body.token;
    });
    afterAll(async () => {
        const connection = (0, typeorm_1.getConnection)();
        await connection.close();
    });
    // testes para criação de cliente
    it('Should be able to create a new client and return 201', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/clients')
            .set('Authorization', `bearer ${token}`)
            .send(createClient);
        clientId = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(createClient.name);
        expect(response.body.phone).toBe(createClient.phone);
        expect(response.body.debit).toBe(createClient.debit);
    });
    it('Should returns 400 beacause there is no client name', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/clients')
            .set('Authorization', `bearer ${token}`)
            .send({
            phone: '35986086543',
            debit: 12.6,
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Name is required');
    });
    it('Should returns 400 beacause there is no client debit', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/clients')
            .set('Authorization', `bearer ${token}`)
            .send({
            name: 'Client example 2',
            phone: '35986086543',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Debit is required');
    });
    it('Should returns 400 beacause there is no valid client debit', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/clients')
            .set('Authorization', `bearer ${token}`)
            .send({
            name: 'Client example 2',
            phone: '35986086543',
            debit: 'aaa',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('debit must be a `number` type, but the final value was: `NaN` (cast from the value `"aaa"`).');
    });
    it('Should not be able to create a client with exists phone and return 400', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/clients')
            .set('Authorization', `bearer ${token}`)
            .send(createClient);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Client already exists');
    });
    // testes para atualização de cliente
    it('Should be able to edit a existing client and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/clients/${clientId}`)
            .set('Authorization', `bearer ${token}`)
            .send(editedClient);
        const repository = (0, typeorm_1.getCustomRepository)(ClientRepository_1.ClientRepository);
        const clientUpdated = await repository.findOne({ id: clientId });
        expect(response.status).toBe(200);
        expect(clientUpdated.name).toBe(editedClient.name);
        expect(clientUpdated.phone).toBe(editedClient.phone);
        expect(clientUpdated.debit).toBe(editedClient.debit);
        expect(response.body.message).toBe('Client updated successfully');
    });
    it('Should return 400 when update client by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/clients/aaa`)
            .set('Authorization', `bearer ${token}`)
            .send(editedClient);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    it('Should return 400 for update missing id client', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/clients/${idInexist}`)
            .set('Authorization', `bearer ${token}`)
            .send(editedClient);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Client does not exist');
    });
    // testes para visualização de cliente por id
    it('Should be able to get a client by Id and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get(`/clients/${clientId}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(editedClient.name);
        expect(response.body.phone).toBe(editedClient.phone);
        expect(response.body.debit).toBe(editedClient.debit);
    });
    it('Should return 400 for searching missing id client', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get(`/clients/${idInexist}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Client does not exist');
    });
    it('Should return 400 when searching client by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get(`/clients/aaa`).set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    // testes para visualização de todos os clientes
    it('Should be able to get all clients and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/clients').set('Authorization', `bearer ${token}`);
        const repository = (0, typeorm_1.getCustomRepository)(ClientRepository_1.ClientRepository);
        const allClients = await repository.find();
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(allClients.length);
    });
    // testes para deleção de cliente
    it('Should be able to delete a client and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/clients/${clientId}`)
            .set('Authorization', `bearer ${token}`);
        const repository = (0, typeorm_1.getCustomRepository)(ClientRepository_1.ClientRepository);
        const deleted = await repository.findOne({ id: clientId });
        expect(response.status).toBe(200);
        expect(deleted).toBeUndefined();
        expect(response.body.message).toBe('Client deleted successfully');
    });
    it('Should return 400 when delete client by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/clients/aaa`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    it('Should return 400 for delete missing id client', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/clients/${idInexist}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Client does not exist');
    });
    // teste para deleção de cliente que possuem registros de outras tabelas associadas - validação da constraint FKClient ON DELETE RESTRICT
    // erro tratado diretamente no banco de dados com a opção ON DELETE RESTRICT - Utilizado dados dos seeders para o teste
    it('should not allow deleting the customer because there are payments associated with it', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete('/clients/1')
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('update or delete on table "clients" violates foreign key constraint "FKClient" on table "payments"');
    });
});
