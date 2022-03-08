import { getCustomRepository, Repository } from 'typeorm';
import { IProvider } from '../dtos/IProvider';
import { Provider } from '../entities/Provider';
import { ProviderRepository } from '../repositories/ProviderRepository';

class ProviderService {
  private repositoryProvider: Repository<Provider>;

  constructor() {
    this.repositoryProvider = getCustomRepository(ProviderRepository);
  }

  async create(data: IProvider) {
    const provider = this.repositoryProvider.create(data);
    await this.repositoryProvider.save(provider);
    return provider;
  }

  async read() {
    const allProviders = await this.repositoryProvider.find();
    return allProviders;
  }

  async readById(id: number) {
    const provider = await this.repositoryProvider.findOne(id);
    return provider;
  }

  async updateById(id: number, data: IProvider) {
    await this.repositoryProvider.update(id, data);
  }
}

export { ProviderService };
