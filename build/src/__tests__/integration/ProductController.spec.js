"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const typeorm_1 = require("typeorm");
const app_1 = require("../../app");
const database_1 = __importDefault(require("../../database"));
const Product_1 = require("../../entities/Product");
const ProductRepository_1 = require("../../repositories/ProductRepository");
// id inexistente
const idInexist = 9999;
// produto criado na execução dos seeders
const loginUser = {
    email: 'user1@gmail.com',
    password: '123456',
};
const createProduct = {
    name: 'Bolo de morang',
    price: 10.5,
    type: Product_1.EnumTypeProduct.GENERAL,
    description: 'O melhor bolo de morango',
};
const editedProduct = {
    name: 'Bolo de morango',
    price: 10.3,
    description: 'O melhor bolo de morango do mundo',
    type: Product_1.EnumTypeProduct.ACAI,
};
let token;
let productId;
describe('Products', () => {
    beforeAll(async () => {
        await (0, database_1.default)();
        const Login = await (0, supertest_1.default)(app_1.app).post('/signin').send(loginUser);
        token = Login.body.token;
    });
    afterAll(async () => {
        const connection = (0, typeorm_1.getConnection)();
        await connection.close();
    });
    // testes para criação de produto
    it('Should be able to create a new product and return 201', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/products')
            .set('Authorization', `bearer ${token}`)
            .send(createProduct);
        productId = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(createProduct.name);
        expect(response.body.price).toBe(createProduct.price);
        expect(response.body.description).toBe(createProduct.description);
        expect(response.body.type).toBe(createProduct.type);
    });
    it('Should returns 400 because there is no product name', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/products')
            .set('Authorization', `bearer ${token}`)
            .send({
            price: 12.0,
            description: 'bla bla bla',
            type: Product_1.EnumTypeProduct.GENERAL,
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Name is required');
    });
    it('Should returns 400 because there is no product type', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/products')
            .set('Authorization', `bearer ${token}`)
            .send({
            name: 'salgadinho',
            price: 1.5,
            description: 'bla bla bla',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Type_product is required');
    });
    it('Should not be able to create a product with exists product and return 400', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/products')
            .set('Authorization', `bearer ${token}`)
            .send(createProduct);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Product already exists');
    });
    // testes para atualização de produto
    it('Should be able to edit a existing product and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/products/${productId}`)
            .set('Authorization', `bearer ${token}`)
            .send(editedProduct);
        const repository = (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository);
        const productUpdated = await repository.findOne({ id: productId });
        expect(response.status).toBe(200);
        expect(productUpdated.name).toBe(editedProduct.name);
        expect(productUpdated.price).toBe(editedProduct.price);
        expect(productUpdated.description).toBe(editedProduct.description);
        expect(productUpdated.type).toBe(editedProduct.type);
        expect(response.body.message).toBe('Product updated successfully');
    });
    it('Should return 400 when update product by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/products/aaa`)
            .set('Authorization', `bearer ${token}`)
            .send(editedProduct);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    it('Should return 400 for update missing id product', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put(`/products/${idInexist}`)
            .set('Authorization', `bearer ${token}`)
            .send(editedProduct);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Product does not exist');
    });
    // testes para visualização de produto por id
    it('Should be able to get a product by Id and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get(`/products/${productId}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(editedProduct.name);
        expect(response.body.price).toBe(editedProduct.price);
        expect(response.body.description).toBe(editedProduct.description);
    });
    it('Should return 400 for searching missing id product', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get(`/products/${idInexist}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Product does not exist');
    });
    it('Should return 400 when searching product by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get(`/products/aaa`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    // testes para visualização de todos os produtos
    it('Should be able to get all products and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/products').set('Authorization', `bearer ${token}`);
        const repository = (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository);
        const allProducts = await repository.find();
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(allProducts.length);
    });
    // testes para deleção de produto
    it('Should be able to delete a product and return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/products/${productId}`)
            .set('Authorization', `bearer ${token}`);
        const repository = (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository);
        const deleted = await repository.findOne({ id: productId });
        expect(response.status).toBe(200);
        expect(deleted).toBeUndefined();
        expect(response.body.message).toBe('Product deleted successfully');
    });
    it('Should return 400 when delete product by invalid type id', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/products/aaa`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).');
    });
    it('Should return 400 for delete missing id product', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .delete(`/products/${idInexist}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Product does not exist');
    });
});
