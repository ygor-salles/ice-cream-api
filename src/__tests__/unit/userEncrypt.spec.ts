import bcrypt from 'bcryptjs';
import { getConnection, getCustomRepository } from 'typeorm';
import createConnection from '../../database';
import { UserRepository } from '../../repositories/UserRepository';

describe('Unit - User encrypt', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  it('Should encrypt user password', async () => {
    const repository = getCustomRepository(UserRepository);
    // usuário cadastrado na execução dos seeders
    const user = await repository.findOne({ email: 'user1@gmail.com' });

    const compareHash = await bcrypt.compare('123456', user.password);

    expect(compareHash).toBe(true);
  });
});
