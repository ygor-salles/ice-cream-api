import request from 'supertest';
import { getConnection, getCustomRepository } from 'typeorm';
import { app } from '../../app';
import createConnection from '../../database';
import { EnumTypeSale } from '../../entities/Sale';
import { SaleRepository } from '../../repositories/SaleRepository';

// id inexistente
const idInexist = 9999;

// venda criado na execução dos seeders
const loginUser = {
  email: 'user1@gmail.com',
  password: '123456',
};

const createSale = {
  total: 15,
  type_sale: EnumTypeSale.MONEY,
  observation: 'Pago 10 reais no pix e 5 reais no dinheiro',
  product_id: 2,
  client_id: 2,
};

const editedSale = {
  total: 0.5,
  type_sale: EnumTypeSale.PIX,
  observation: 'Valor alterado - R$ 0,50',
  product_id: 3,
  client_id: 3,
};

let token: string;
let saleId: number;

describe('Sales', () => {
  beforeAll(async () => {
    await createConnection();
    const Login = await request(app).post('/signin').send(loginUser);
    token = Login.body.token;
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  // testes para criação de venda
  it('Should be able to create a new sale and return 201', async () => {
    const response = await request(app)
      .post('/sales')
      .set('Authorization', `bearer ${token}`)
      .send(createSale);

    saleId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body.total).toBe(createSale.total);
    expect(response.body.type_sale).toBe(createSale.type_sale);
    expect(response.body.observation).toBe(createSale.observation);
    expect(response.body.product_id).toBe(createSale.product_id);
    expect(response.body.client_id).toBe(createSale.client_id);
  });

  it('Should returns 400 because there is no sale total', async () => {
    const response = await request(app)
      .post('/sales')
      .set('Authorization', `bearer ${token}`)
      .send({
        type_sale: EnumTypeSale.MONEY,
        observation: 'Pago 10 reais no pix e 5 reais no dinheiro',
        product_id: 2,
        client_id: 2,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Total is required');
  });

  it('Should returns 400 because there is no sale type_sale', async () => {
    const response = await request(app)
      .post('/sales')
      .set('Authorization', `bearer ${token}`)
      .send({
        total: 15,
        observation: 'Pago 10 reais no pix e 5 reais no dinheiro',
        product_id: 2,
        client_id: 2,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Type_sale is required');
  });

  it('Should returns 400 because there is no sale product_id', async () => {
    const response = await request(app)
      .post('/sales')
      .set('Authorization', `bearer ${token}`)
      .send({
        total: 2,
        type_sale: EnumTypeSale.MONEY,
        observation: '1 real de bala e 1 real de chiclete',
        client_id: 2,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Product_id is required');
  });

  // testes para atualização de venda
  it('Should be able to edit a existing sale and return 200', async () => {
    const response = await request(app)
      .put(`/sales/${saleId}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedSale);

    const repository = getCustomRepository(SaleRepository);
    const saleUpdated = await repository.findOne({ id: saleId });

    expect(response.status).toBe(200);
    expect(saleUpdated.total).toBe(editedSale.total);
    expect(saleUpdated.type_sale).toBe(editedSale.type_sale);
    expect(saleUpdated.observation).toBe(editedSale.observation);
    expect(saleUpdated.product_id).toBe(editedSale.product_id);
    expect(saleUpdated.client_id).toBe(editedSale.client_id);
    expect(response.body.message).toBe('Sale updated successfully');
  });

  it('Should return 400 when update sale by invalid type id', async () => {
    const response = await request(app)
      .put(`/sales/aaa`)
      .set('Authorization', `bearer ${token}`)
      .send(editedSale);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).',
    );
  });

  it('Should return 404 for update missing id sale', async () => {
    const response = await request(app)
      .put(`/sales/${idInexist}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedSale);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Sale does not exist');
  });

  // testes para visualização de venda por id
  it('Should be able to get a sale by Id and return 200', async () => {
    const response = await request(app)
      .get(`/sales/${saleId}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(editedSale.total);
    expect(response.body.type_sale).toBe(editedSale.type_sale);
    expect(response.body.observation).toBe(editedSale.observation);
    expect(response.body.product_id).toBe(editedSale.product_id);
    expect(response.body.client_id).toBe(editedSale.client_id);
  });

  it('Should return 404 for searching missing id sale', async () => {
    const response = await request(app)
      .get(`/sales/${idInexist}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Sale does not exist');
  });

  it('Should return 400 when searching sale by invalid type id', async () => {
    const response = await request(app).get(`/sales/aaa`).set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).',
    );
  });

  // testes para visualização de todos os produtos
  it('Should be able to get all sales and return 200', async () => {
    const response = await request(app).get('/sales').set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(SaleRepository);
    const allSales = await repository.find();

    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(allSales.length);
  });

  // testes para deleção de produto
  it('Should be able to delete a sale and return 200', async () => {
    const response = await request(app)
      .delete(`/sales/${saleId}`)
      .set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(SaleRepository);
    const deleted = await repository.findOne({ id: saleId });

    expect(response.status).toBe(200);
    expect(deleted).toBeUndefined();
    expect(response.body.message).toBe('Sale deleted successfully');
  });

  it('Should return 400 when delete sale by invalid type id', async () => {
    const response = await request(app)
      .delete(`/sales/aaa`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).',
    );
  });

  it('Should return 404 for delete missing id sale', async () => {
    const response = await request(app)
      .delete(`/sales/${idInexist}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Sale does not exist');
  });
});
