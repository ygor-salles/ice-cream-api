import { getCustomRepository, Repository } from 'typeorm';
import { IProduct } from '../dtos/IProduct';
import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';

class ProductService {
  private repositoryProduct: Repository<Product>;

  constructor() {
    this.repositoryProduct = getCustomRepository(ProductRepository);
  }

  async create(data: IProduct) {
    const product = this.repositoryProduct.create(data);
    await this.repositoryProduct.save(product);
    return product;
  }

  async read() {
    const allProducts = await this.repositoryProduct.find({
      order: { updated_at: 'DESC' },
      relations: ['combinations'],
    });
    return allProducts;
  }

  async readById(id: number) {
    const product = await this.repositoryProduct.findOne(id, { relations: ['combinations'] });
    return product;
  }

  async deleteById(id: number) {
    await this.repositoryProduct.delete(id);
  }

  async updateById(id: number, data: IProduct) {
    await this.repositoryProduct.update(id, data);
  }
}

export { ProductService };
