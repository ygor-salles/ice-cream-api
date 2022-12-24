import { getCustomRepository } from 'typeorm';
import { ClientRepository } from '../repositories/ClientRepository';

class HookSale {
  public static async updateDebitClient(value: number, client_id: number): Promise<void> {
    const repositoryClient = getCustomRepository(ClientRepository);
    const client = await repositoryClient.findOne({ id: client_id });

    client.debit += value;
    client.updated_at = new Date();
    await repositoryClient.update({ id: client_id }, client);
  }

  public static async afterRemovedSaleUpdateDebitClient(
    value: number,
    client_id: number,
  ): Promise<void> {
    const repositoryClient = getCustomRepository(ClientRepository);
    const client = await repositoryClient.findOne({ id: client_id });

    client.debit -= value;
    client.updated_at = new Date();

    await repositoryClient.update({ id: client_id }, client);
  }
}

export { HookSale };
