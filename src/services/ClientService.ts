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
    const allClients = await this.repositoryClient.find();
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
}

export { ClientService };
