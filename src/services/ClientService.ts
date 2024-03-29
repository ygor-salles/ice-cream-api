import { getCustomRepository, Repository } from 'typeorm';
import { IClient } from '../dtos/IClient';
import { Client } from '../entities/Client';
import { ClientRepository } from '../repositories/ClientRepository';

class ClientService {
  private repositoryClient: Repository<Client>;

  constructor() {
    this.repositoryClient = getCustomRepository(ClientRepository);
  }

  async create(data: IClient) {
    const client = this.repositoryClient.create(data);
    await this.repositoryClient.save(client);
    return client;
  }

  async read() {
    const allClients = await this.repositoryClient.find({ order: { updated_at: 'DESC' } });
    return allClients;
  }

  async readById(id: number) {
    const client = await this.repositoryClient.findOne(id);
    return client;
  }

  async deleteById(id: number) {
    await this.repositoryClient.delete(id);
  }

  async updateById(id: number, data: IClient) {
    await this.repositoryClient.update(id, data);
  }

  async readSumDebitClient() {
    const sumDebits = await this.repositoryClient
      .createQueryBuilder('clients')
      .select('SUM(debit)', 'total_debits')
      .getRawOne();

    return sumDebits;
  }
}

export { ClientService };
