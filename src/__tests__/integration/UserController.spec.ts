import request from 'supertest';
import { getConnection, getCustomRepository } from 'typeorm';
import { app } from '../../app';
import createConnection from '../../database';
import { EnumRoleUser } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';

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
  role: EnumRoleUser.SUPER,
};

const editedUser = {
  name: 'User example edited',
  email: 'user@example_edit.com',
  password: '123456',
  role: EnumRoleUser.NORMAL,
};

let token: string;
let userId: number;

describe('Users', () => {
  beforeAll(async () => {
    await createConnection();
    const Login = await request(app).post('/signin').send(loginUser);
    token = Login.body.token;
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  // testes para criação de usuário
  it('Should be able to create a new user and return 201', async () => {
    const response = await request(app).post('/users').send(createUser);

    userId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(createUser.name);
    expect(response.body.email).toBe(createUser.email);
    expect(response.body.role).toBe(createUser.role);
  });

  it('Should returns 400 beacause there is no user name', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@example2.com.br',
      password: '123456',
      role: EnumRoleUser.SUPER,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Name is required');
  });

  it('Should returns 400 beacause there is no user email', async () => {
    const response = await request(app).post('/users').send({
      name: 'User example 2',
      password: '123456',
      role: EnumRoleUser.SUPER,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('E-mail is required');
  });

  it('Should returns 400 beacause there is no valid user email', async () => {
    const response = await request(app).post('/users').send({
      name: 'User example 2',
      email: 'email_invalid.com',
      password: '123456',
      role: EnumRoleUser.SUPER,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Should be e-mail');
  });

  it('Should returns 400 beacause there is no user password', async () => {
    const response = await request(app).post('/users').send({
      name: 'User example 2',
      email: 'user@example2.com.br',
      role: EnumRoleUser.SUPER,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Password is required');
  });

  it('Should returns 400 beacause there is no user role', async () => {
    const response = await request(app).post('/users').send({
      name: 'User example 2',
      email: 'user@example2.com.br',
      password: '123456',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Type user is required');
  });

  it('Should returns 400 beacause there is no valid user role', async () => {
    const response = await request(app).post('/users').send({
      name: 'User example 2',
      email: 'user@example2.com.br',
      password: '123456',
      role: 'invalid',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'role must be one of the following values: SUPER, NORMAL, EMPLOYEE',
    );
  });

  it('Should not be able to create a user with exists email and return 400', async () => {
    const response = await request(app).post('/users').send(createUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  // testes para atualização de usuário
  it('Should be able to edit a existing user and return 200', async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedUser);

    const repository = getCustomRepository(UserRepository);
    const userUpdated = await repository.findOne({ id: userId });

    expect(response.status).toBe(200);
    expect(userUpdated.name).toBe(editedUser.name);
    expect(userUpdated.email).toBe(editedUser.email);
    expect(userUpdated.password).not.toBe(editedUser.password);
    expect(userUpdated.role).toBe(editedUser.role);
    expect(response.body.message).toBe('User updated successfully');
  });

  it('Should return 400 when update user by invalid type id', async () => {
    const response = await request(app)
      .delete(`/users/aaa`)
      .set('Authorization', `bearer ${token}`)
      .send(editedUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).',
    );
  });

  it('Should return 404 for update missing id user', async () => {
    const response = await request(app)
      .put(`/users/${idInexist}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedUser);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User does not exist');
  });

  // testes para visualização de usuário por id
  it('Should be able to get a user by Id and return 200', async () => {
    const response = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(editedUser.name);
    expect(response.body.email).toBe(editedUser.email);
    expect(response.body.role).toBe(editedUser.role);
  });

  it('Should return 404 for searching missing id user', async () => {
    const response = await request(app)
      .get(`/users/${idInexist}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User does not exist');
  });

  it('Should return 400 when searching user by invalid type id', async () => {
    const response = await request(app).get(`/users/aaa`).set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).',
    );
  });

  // testes para visualização de todos os usuários
  it('Should be able to get all users and return 200', async () => {
    const response = await request(app).get('/users').set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(UserRepository);
    const allUsers = await repository.find();

    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(allUsers.length);
  });

  // testes para deleção de usuário
  it('Should be able to delete a user and return 200', async () => {
    const response = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(UserRepository);
    const deleted = await repository.findOne({ id: userId });

    expect(response.status).toBe(200);
    expect(deleted).toBeUndefined();
    expect(response.body.message).toBe('User deleted successfully');
  });

  it('Should return 400 when delete user by invalid type id', async () => {
    const response = await request(app)
      .delete(`/users/aaa`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).',
    );
  });

  it('Should return 404 for delete missing id user', async () => {
    const response = await request(app)
      .delete(`/users/${idInexist}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User does not exist');
  });
});
