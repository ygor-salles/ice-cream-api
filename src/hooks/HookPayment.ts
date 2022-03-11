import { getCustomRepository } from 'typeorm';
import { ClientRepository } from '../repositories/ClientRepository';
import { ApiError } from '../validators/Exceptions/ApiError';

class HookPayment {
  public static async updateDebitClient(value: number, client_id: number): Promise<void> {
    const repositoryClient = getCustomRepository(ClientRepository);
    const client = await repositoryClient.findOne({ id: client_id });

    client.debit -= value;
    if (client.debit < 0) {
      throw new ApiError(400, 'Attention! Payment greater than debit. Operation not completed!');
    }
    await repositoryClient.update({ id: client_id }, client);
  }
}

export { HookPayment };
