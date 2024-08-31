"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const typeorm_1 = require("typeorm");
const app_1 = require("../../app");
const database_1 = __importDefault(require("../../database"));
const PurchaseRepository_1 = require("../../repositories/PurchaseRepository");
// id inexistente
const idInexist = 9999;
// purchase criado na execução dos seeders
const loginUser = {
    email: 'user1@gmail.com',
    password: '123456',
};
const createPurchase = {
    value_total: 15,
    observation: 'bla bla bla',
    its_ice_cream_shoop: true,
    nf_url: 'bla bla bla',
    provider_id: 1,
};
const editedPurchase = {
    value_total: 15.5,
    observation: 'bla bla bla bla',
    its_ice_cream_shoop: false,
    nf_url: 'bla bla bla bla',
    provider_id: 2,
};
let token;
let purchaseId;
describe('Purchases', () => {
    beforeAll(async () => {
        await (0, database_1.default)();
        const Login = await (0, supertest_1.default)(app_1.app).post('/signin').send(loginUser);
        token = Login.body.token;
    });
    afterAll(async () => {
        const connection = (0, typeorm_1.getConnection)();
        await connection.close();
    });
    // testes para criação de purchase
    it('Should be able to create a new purchase and return 201', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/purchase')
            .set('Authorization', `bearer ${token}`)
            .send(createPurchase);
        purchaseId = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body.value_total).toBe(createPurchase.value_total);
        expect(response.body.observation).toBe(createPurchase.observation);
        expect(response.body.its_ice_cream_shoop).toBe(createPurchase.its_ice_cream_shoop);
        expect(response.body.nf_url).toBe(createPurchase.nf_url);
    });
    it('Should returns 400 because there is no purchase value', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/purchase')
            .set('Authorization', `bearer ${token}`)
            .send({
            observation: 'bla bla bla bla',
            its_ice_cream_shoop: false,
            nf_url: 'bla bla bla bla',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Value total is required');
    });
    // testes para atualização de purchase
    it('Should be able to edit a existing purchase and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/purchase/${purchaseId}`)
            .set('Authorization', `bearer ${token}`)
            .send(editedPurchase);
        const repository = (0, typeorm_1.getCustomRepository)(PurchaseRepository_1.PurchaseRepository);
        const purchaseUpdated = await repository.findOne({ id: purchaseId });
        expect(response.status).toBe(200);
        expect(purchaseUpdated.value_total).toBe(editedPurchase.value_total);
        expect(purchaseUpdated.observation).toBe(editedPurchase.observation);
        expect(purchaseUpdated.nf_url).toBe(editedPurchase.nf_url);
        expect(purchaseUpdated.its_ice_cream_shoop).toBe(editedPurchase.its_ice_cream_shoop);
        expect(response.body.message).toBe('Purchase updated successfully');
    });
    it('Should return 400 when update purchase by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/purchase/aaa`)
            .set('Authorization', `bearer ${token}`)
            .send(editedPurchase);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    it('Should return 400 for update missing id purchase', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/purchase/${idInexist}`)
            .set('Authorization', `bearer ${token}`)
            .send(editedPurchase);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Purchase does not exist');
    });
    // testes para visualização de purchase por id
    it('Should be able to get a purchase by Id and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get(`/purchase/${purchaseId}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.value_total).toBe(editedPurchase.value_total);
        expect(response.body.observation).toBe(editedPurchase.observation);
        expect(response.body.nf_url).toBe(editedPurchase.nf_url);
        expect(response.body.its_ice_cream_shoop).toBe(editedPurchase.its_ice_cream_shoop);
    });
    it('Should return 400 for searching missing id purchase', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get(`/purchase/${idInexist}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Purchase does not exist');
    });
    it('Should return 400 when searching purchase by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get(`/purchase/aaa`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    // testes para visualização de todos os purchases
    it('Should be able to get all purchases and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/purchase').set('Authorization', `bearer ${token}`);
        const repository = (0, typeorm_1.getCustomRepository)(PurchaseRepository_1.PurchaseRepository);
        const allPurchases = await repository.find();
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(allPurchases.length);
    });
    // testes para deleção de purchase
    it('Should be able to delete a purchase and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/purchase/${purchaseId}`)
            .set('Authorization', `bearer ${token}`);
        const repository = (0, typeorm_1.getCustomRepository)(PurchaseRepository_1.PurchaseRepository);
        const deleted = await repository.findOne({ id: purchaseId });
        expect(response.status).toBe(200);
        expect(deleted).toBeUndefined();
        expect(response.body.message).toBe('Purchase deleted successfully');
    });
    it('Should return 400 when delete purchase by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/purchase/aaa`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    it('Should return 400 for delete missing id purchase', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/purchase/${idInexist}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Purchase does not exist');
    });
});
