import request from 'supertest';
import { getConnection, getCustomRepository } from 'typeorm';
import { app } from '../../app';
import createConnection from '../../database';
import { ClientRepository } from '../../repositories/ClientRepository';
import { PaymentRepository } from '../../repositories/PaymentRepository';

// id inexistente
const idInexist = 9999;

// pagamento criado na execução dos seeders
const loginUser = {
  email: 'user1@gmail.com',
  password: '123456',
};

const createPayment = {
  value: 20,
  observation: 'Pago 20 reais no dinheiro',
  client_id: 1,
};

const editedPayment = {
  value: 10,
  observation: 'Pago 10 reais no pix',
  client_id: 2,
};

const client2 = {
  name: 'Augusto Pereira Magalhães',
  phone: '35987094362',
  debit: 130,
};

const payment2 = {
  value: 150,
  observation: '150 reais no pix',
  client_id: null,
};

let token: string;
let paymentId: number;

describe('Payments', () => {
  beforeAll(async () => {
    await createConnection();
    const Login = await request(app).post('/signin').send(loginUser);
    token = Login.body.token;
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  // testes para criação de pagamento
  it('Should be able to create a new payment and return 201', async () => {
    const response = await request(app)
      .post('/payments')
      .set('Authorization', `bearer ${token}`)
      .send(createPayment);

    paymentId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body.value).toBe(createPayment.value);
    expect(response.body.observation).toBe(createPayment.observation);
    expect(response.body.client_id).toBe(createPayment.client_id);
  });

  it('Should returns 400 because there is no payment value', async () => {
    const response = await request(app)
      .post('/payments')
      .set('Authorization', `bearer ${token}`)
      .send({
        observation: '20 reais no pix',
        client_id: 1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Value is required');
  });

  it('Should returns 400 because there is no payment client_id', async () => {
    const response = await request(app)
      .post('/payments')
      .set('Authorization', `bearer ${token}`)
      .send({
        value: 100,
        observation: '20 reais no pix, 80 no dinheiro',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Client_id is required');
  });

  it('Should not debit the customers account when trying to make a payment greater than your debt', async () => {
    const repositoryClient = getCustomRepository(ClientRepository);

    const debitFinish = client2.debit - payment2.value;

    const client = repositoryClient.create(client2);
    await repositoryClient.save(client);
    payment2.client_id = client.id;

    const response = await request(app)
      .post('/payments')
      .set('Authorization', `bearer ${token}`)
      .send(payment2);

    const updateClient = await repositoryClient.findOne(client.id);

    expect(response.body.message).toBe(
      'Attention! Payment greater than debit. Operation not completed!',
    );
    expect(updateClient.debit).not.toBe(debitFinish);
    expect(updateClient.debit).toBe(client2.debit);
  });

  // testes para atualização de pagamento
  it('Should be able to edit a existing payment and return 200', async () => {
    const response = await request(app)
      .put(`/payments/${paymentId}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedPayment);

    const repository = getCustomRepository(PaymentRepository);
    const paymentUpdated = await repository.findOne({ id: paymentId });

    expect(response.status).toBe(200);
    expect(paymentUpdated.value).toBe(editedPayment.value);
    expect(paymentUpdated.observation).toBe(editedPayment.observation);
    expect(paymentUpdated.client_id).toBe(editedPayment.client_id);
    expect(response.body.message).toBe('Payment updated successfully');
  });

  it('Should return 400 when update payment by invalid type id', async () => {
    const response = await request(app)
      .put(`/payments/aaa`)
      .set('Authorization', `bearer ${token}`)
      .send(editedPayment);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).',
    );
  });

  it('Should return 400 for update missing id payment', async () => {
    const response = await request(app)
      .put(`/payments/${idInexist}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedPayment);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Payment does not exist');
  });

  // testes para visualização de pagamento por id
  it('Should be able to get a payment by Id and return 200', async () => {
    const response = await request(app)
      .get(`/payments/${paymentId}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.value).toBe(editedPayment.value);
    expect(response.body.observation).toBe(editedPayment.observation);
    expect(response.body.client_id).toBe(editedPayment.client_id);
  });

  it('Should return 400 for searching missing id payment', async () => {
    const response = await request(app)
      .get(`/payments/${idInexist}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Payment does not exist');
  });

  it('Should return 400 when searching payment by invalid type id', async () => {
    const response = await request(app)
      .get(`/payments/aaa`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).',
    );
  });

  // testes para visualização de todos os produtos
  it('Should be able to get all payments and return 200', async () => {
    const response = await request(app).get('/payments').set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(PaymentRepository);
    const allPayments = await repository.find();

    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(allPayments.length);
  });

  // testes para deleção de produto
  it('Should be able to delete a payment and return 200', async () => {
    const response = await request(app)
      .delete(`/payments/${paymentId}`)
      .set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(PaymentRepository);
    const deleted = await repository.findOne({ id: paymentId });

    expect(response.status).toBe(200);
    expect(deleted).toBeUndefined();
    expect(response.body.message).toBe('Payment deleted successfully');
  });

  it('Should return 400 when delete payment by invalid type id', async () => {
    const response = await request(app)
      .delete(`/payments/aaa`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).',
    );
  });

  it('Should return 400 for delete missing id payment', async () => {
    const response = await request(app)
      .delete(`/payments/${idInexist}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Payment does not exist');
  });
});
