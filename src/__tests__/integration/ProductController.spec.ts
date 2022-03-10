import request from 'supertest';
import { getConnection, getCustomRepository } from 'typeorm';
import { app } from '../../app';
import createConnection from '../../database';
import { ProductRepository } from '../../repositories/ProductRepository';

// id inexistente
const idInexist = 9999;

<<<<<<< HEAD
// usuário criado na execução dos seeders
=======
// produto criado na execução dos seeders
>>>>>>> main
const loginUser = {
  email: 'user1@gmail.com',
  password: '123456',
};

const createProduct = {
  name: 'Bolo de morang',
  price: 10.5,
  description: 'O melhor bolo de morango',
};

const editedProduct = {
  name: 'Bolo de morango',
  price: 10.3,
  description: 'O melhor bolo de morango do mundo',
};

let token: string;
let productId: number;

describe('Products', () => {
  beforeAll(async () => {
    await createConnection();
    const Login = await request(app).post('/signin').send(loginUser);
    token = Login.body.token;
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

<<<<<<< HEAD
  // testes para criação de usuário
=======
  // testes para criação de produto
>>>>>>> main
  it('Should be able to create a new product and return 201', async () => {
    const response = await request(app)
      .post('/products')
      .set('Authorization', `bearer ${token}`)
      .send(createProduct);

    productId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(createProduct.name);
    expect(response.body.price).toBe(createProduct.price);
    expect(response.body.description).toBe(createProduct.description);
  });

  it('Should returns 400 because there is no product name', async () => {
    const response = await request(app)
      .post('/products')
      .set('Authorization', `bearer ${token}`)
      .send({
        price: 12.0,
        description: 'bla bla bla',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Name is required');
  });

<<<<<<< HEAD
  it('Should returns 400 because there is no product price', async () => {
    const response = await request(app)
      .post('/products')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Product 2',
        description: 'bla bla bla',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Price is required');
  });

  it('Should returns 400 because there is no valid product description', async () => {
    const response = await request(app)
      .post('/products')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Product 3',
        price: 10.5,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Description is required');
  });

=======
>>>>>>> main
  it('Should not be able to create a product with exists product and return 400', async () => {
    const response = await request(app)
      .post('/products')
      .set('Authorization', `bearer ${token}`)
      .send(createProduct);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Product already exists');
  });

<<<<<<< HEAD
  // testes para atualização de usuário
=======
  // testes para atualização de produto
>>>>>>> main
  it('Should be able to edit a existing product and return 200', async () => {
    const response = await request(app)
      .put(`/products/${productId}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedProduct);

    const repository = getCustomRepository(ProductRepository);
    const productUpdated = await repository.findOne({ id: productId });

    expect(response.status).toBe(200);
    expect(productUpdated.name).toBe(editedProduct.name);
    expect(productUpdated.price).toBe(editedProduct.price);
    expect(productUpdated.description).toBe(editedProduct.description);
    expect(response.body.message).toBe('Product updated successfully');
  });

  it('Should return 400 when update product by invalid type id', async () => {
    const response = await request(app)
      .put(`/products/aaa`)
      .set('Authorization', `bearer ${token}`)
      .send(editedProduct);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).',
    );
  });

  it('Should return 404 for update missing id product', async () => {
    const response = await request(app)
      .put(`/products/${idInexist}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedProduct);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product does not exist');
  });

<<<<<<< HEAD
  // testes para visualização de usuário por id
=======
  // testes para visualização de produto por id
>>>>>>> main
  it('Should be able to get a product by Id and return 200', async () => {
    const response = await request(app)
      .get(`/products/${productId}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(editedProduct.name);
    expect(response.body.price).toBe(editedProduct.price);
    expect(response.body.description).toBe(editedProduct.description);
  });

  it('Should return 404 for searching missing id product', async () => {
    const response = await request(app)
      .get(`/products/${idInexist}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product does not exist');
  });

  it('Should return 400 when searching product by invalid type id', async () => {
    const response = await request(app)
      .get(`/products/aaa`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).',
    );
  });

  // testes para visualização de todos os produtos
  it('Should be able to get all products and return 200', async () => {
    const response = await request(app).get('/products').set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(ProductRepository);
    const allProducts = await repository.find();

    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(allProducts.length);
  });

  // testes para deleção de produto
  it('Should be able to delete a product and return 200', async () => {
    const response = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(ProductRepository);
    const deleted = await repository.findOne({ id: productId });

    expect(response.status).toBe(200);
    expect(deleted).toBeUndefined();
    expect(response.body.message).toBe('Product deleted successfully');
  });

  it('Should return 400 when delete product by invalid type id', async () => {
    const response = await request(app)
      .delete(`/products/aaa`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'id must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).',
    );
  });

  it('Should return 404 for delete missing id product', async () => {
    const response = await request(app)
      .delete(`/products/${idInexist}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product does not exist');
  });
});
