import { getCustomRepository, Repository } from 'typeorm';
import { IProduct } from '../dtos/IProduct';
import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';

class ProductService {
  private repositoryProvider: Repository<Product>;

  constructor() {
    this.repositoryProvider = getCustomRepository(ProductRepository);
  }

  async create(data: IProduct) {
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

  async deleteById(id: number) {
    await this.repositoryProvider.delete(id);
  }

  async updateById(id: number, data: IProduct) {
    await this.repositoryProvider.update(id, data);
  }
}

export { ProductService };
