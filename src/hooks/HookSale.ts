import { getCustomRepository } from 'typeorm';
import { ClientRepository } from '../repositories/ClientRepository';
import { ApiError } from '../validators/Exceptions/ApiError';

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
    if (client.debit < 0) {
      throw new ApiError(
        400,
        'Attention! Payment value greater than debit. Operation not completed!',
      );
    }
    await repositoryClient.update({ id: client_id }, client);
  }
}

export { HookSale };
