import { getCustomRepository } from 'typeorm';
import { EnumRoleUser } from '../../entities/User';
import { ClientRepository } from '../../repositories/ClientRepository';
import { UserRepository } from '../../repositories/UserRepository';

class DataSeed {
  public static async verifyEntities(): Promise<boolean> {
    const repositoryUser = getCustomRepository(UserRepository);
    try {
      const allUsers = await repositoryUser.find();
      return !!allUsers.length;
    } catch (error) {
      return false;
    }
  }

  public static async createUsers(): Promise<void> {
    const repository = getCustomRepository(UserRepository);
    const arrayUsers = [];

    arrayUsers.push(
      repository.create({
        name: 'User 1',
        email: 'user1@gmail.com',
        password: '123456',
        role: EnumRoleUser.SUPER,
      }),
    );
    arrayUsers.push(
      repository.create({
        name: 'User 2',
        email: 'user2@gmail.com',
        password: '123456',
        role: EnumRoleUser.NORMAL,
      }),
    );
    arrayUsers.push(
      repository.create({
        name: 'User 3',
        email: 'user3@gmail.com',
        password: '123456',
        role: EnumRoleUser.NORMAL,
      }),
    );
    arrayUsers.push(
      repository.create({
        name: 'User 4',
        email: 'user4@gmail.com',
        password: '123456',
        role: EnumRoleUser.EMPLOYEE,
      }),
    );

    await repository.save(arrayUsers);
  }

  public static async createClients(): Promise<void> {
    const repository = getCustomRepository(ClientRepository);
    const arrayClients = [];

    arrayClients.push(
      repository.create({
        name: 'Maria Aparecida Teste',
        phone: '35984987634',
        debit: 85.5,
      }),
      repository.create({
        name: 'Carlos Gomes Teste',
        phone: '35984987635',
        debit: 0,
      }),
      repository.create({
        name: 'Pedro Alcantara Teste',
        phone: '35984987636',
        debit: 10,
      }),
    );

    await repository.save(arrayClients);
  }
}

export { DataSeed };
