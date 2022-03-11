import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../../app';
import createConnection from '../../database';

describe('Auth', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  it('Server is running', async () => {
    const response = await request(app).get('/');

    expect(response.body.message).toBe('Welcome api-iceCreamShop');
  });

  it('Should be able to login with existing user and a token must be returned with status 200', async () => {
    // usuário criado na execução dos seeders
    const loginUser = {
      email: 'user1@gmail.com',
      password: '123456',
    };

    const response = await request(app).post('/signin').send(loginUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Should not be able to login with a non-existing user', async () => {
    const loginNotExistingUser = {
      email: 'test@test.com',
      password: 'test',
    };
    const response = await request(app).post('/signin').send(loginNotExistingUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Credenciais incorretas!');
  });
});
