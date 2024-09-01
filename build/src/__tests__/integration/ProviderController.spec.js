"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const typeorm_1 = require("typeorm");
const app_1 = require("../../app");
const database_1 = __importDefault(require("../../database"));
const ProviderRepository_1 = require("../../repositories/ProviderRepository");
// id inexistente
const idInexist = 9999;
// usuário criado na execução dos seeders
const loginUser = {
    email: 'user1@gmail.com',
    password: '123456',
};
const createProvider = {
    name: 'Provider example',
    phone: '35984987600',
    its_ice_cream_shoop: true,
};
const editedProvider = {
    name: 'Provider example edited',
    phone: '35984987611',
    its_ice_cream_shoop: false,
};
let token;
let providerId;
describe('Providers', () => {
    beforeAll(async () => {
        await (0, database_1.default)();
        const Login = await (0, supertest_1.default)(app_1.app).post('/signin').send(loginUser);
        token = Login.body.token;
    });
    afterAll(async () => {
        const connection = (0, typeorm_1.getConnection)();
        await connection.close();
    });
    // testes para criação de fornecedor
    it('Should be able to create a new provider and return 201', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/providers')
            .set('Authorization', `bearer ${token}`)
            .send(createProvider);
        providerId = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(createProvider.name);
        expect(response.body.phone).toBe(createProvider.phone);
        expect(response.body.its_ice_cream_shoop).toBe(createProvider.its_ice_cream_shoop);
    });
    it('Should returns 400 beacause there is no provider name', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/providers')
            .set('Authorization', `bearer ${token}`)
            .send({
            phone: '35986086543',
            its_ice_cream_shoop: true,
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Name is required');
    });
    it('Should returns 400 beacause there is no provider its_ice_cream_shoop', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/providers')
            .set('Authorization', `bearer ${token}`)
            .send({
            name: 'Provider example 2',
            phone: '35986086543',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Its_ice_cream_shoop is required');
    });
    it('Should returns 400 beacause there is no valid provider its_ice_cream_shoop', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/providers')
            .set('Authorization', `bearer ${token}`)
            .send({
            name: 'Provider example 2',
            phone: '35986086543',
            its_ice_cream_shoop: 'aaa',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('its_ice_cream_shoop must be a `boolean` type, but the final value was: `"aaa"`.');
    });
    it('Should not be able to create a provider with exists phone and return 400', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/providers')
            .set('Authorization', `bearer ${token}`)
            .send(createProvider);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Provider already exists');
    });
    // testes para atualização de fornecedor
    it('Should be able to edit a existing provider and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/providers/${providerId}`)
            .set('Authorization', `bearer ${token}`)
            .send(editedProvider);
        const repository = (0, typeorm_1.getCustomRepository)(ProviderRepository_1.ProviderRepository);
        const providerUpdated = await repository.findOne({ id: providerId });
        expect(response.status).toBe(200);
        expect(providerUpdated.name).toBe(editedProvider.name);
        expect(providerUpdated.phone).toBe(editedProvider.phone);
        expect(providerUpdated.its_ice_cream_shoop).toBe(editedProvider.its_ice_cream_shoop);
        expect(response.body.message).toBe('Provider updated successfully');
    });
    it('Should return 400 when update provider by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/providers/aaa`)
            .set('Authorization', `bearer ${token}`)
            .send(editedProvider);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    it('Should return 400 for update missing id provider', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/providers/${idInexist}`)
            .set('Authorization', `bearer ${token}`)
            .send(editedProvider);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Provider does not exist');
    });
    // testes para visualização de fornecedor por id
    it('Should be able to get a provider by Id and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get(`/providers/${providerId}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(editedProvider.name);
        expect(response.body.phone).toBe(editedProvider.phone);
        expect(response.body.its_ice_cream_shoop).toBe(editedProvider.its_ice_cream_shoop);
    });
    it('Should return 400 for searching missing id provider', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get(`/providers/${idInexist}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Provider does not exist');
    });
    it('Should return 400 when searching provider by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get(`/providers/aaa`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    // testes para visualização de todos os fornecedores
    it('Should be able to get all providers and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/providers').set('Authorization', `bearer ${token}`);
        const repository = (0, typeorm_1.getCustomRepository)(ProviderRepository_1.ProviderRepository);
        const allProviders = await repository.find();
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(allProviders.length);
    });
    // testes para deleção de fornecedor
    it('Should be able to delete a provider and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/providers/${providerId}`)
            .set('Authorization', `bearer ${token}`);
        const repository = (0, typeorm_1.getCustomRepository)(ProviderRepository_1.ProviderRepository);
        const deleted = await repository.findOne({ id: providerId });
        expect(response.status).toBe(200);
        expect(deleted).toBeUndefined();
        expect(response.body.message).toBe('Provider deleted successfully');
    });
    it('Should return 400 when delete provider by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/providers/aaa`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    it('Should return 400 for delete missing id provider', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/providers/${idInexist}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Provider does not exist');
    });
});
