import { getCustomRepository } from 'typeorm';
import { EnumRoleUser } from '../../entities/User';
import { ClientRepository } from '../../repositories/ClientRepository';
import { PaymentRepository } from '../../repositories/PaymentRepository';
import { ProductRepository } from '../../repositories/ProductRepository';
import { ProviderRepository } from '../../repositories/ProviderRepository';
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

  public static async createPayments(): Promise<void> {
    const repository = getCustomRepository(PaymentRepository);
    const arrayPayments = [];

    arrayPayments.push(
      repository.create({
        value: 100,
        observation: '80 reais pago no pix, 20 reais no casrtão de crédito',
        client_id: 1,
      }),
      repository.create({
        value: 80,
        observation: '80 reais pago no dinheiro',
        client_id: 1,
      }),
      repository.create({
        value: 50,
        client_id: 2,
      }),
    );

    await repository.save(arrayPayments);
  }

  public static async createProducts(): Promise<void> {
    const repository = getCustomRepository(ProductRepository);
    const arrayProducts = [];

    arrayProducts.push(
      repository.create({
        name: 'Chocolate Trento',
        price: 3.5,
      }),
      repository.create({
        name: 'Sorvete de chocolate',
        description: 'Sorvete de chocolate samatina',
      }),
      repository.create({
        name: 'Pirulito',
        price: 0.5,
        description: 'Pirulito lolipop',
      }),
    );

    await repository.save(arrayProducts);
  }

  public static async createProviders(): Promise<void> {
    const repository = getCustomRepository(ProviderRepository);
    const arrayProviders = [];

    arrayProviders.push(
      repository.create({
        name: 'José Francisco',
        phone: '35987650934',
        its_ice_cream_shoop: true,
      }),
      repository.create({
        name: 'Rosilene Mercado',
        its_ice_cream_shoop: false,
      }),
      repository.create({
        name: 'Amarildo',
        phone: '35987650932',
        its_ice_cream_shoop: true,
      }),
    );

    await repository.save(arrayProviders);
  }
}

export { DataSeed };
