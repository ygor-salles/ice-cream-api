import { getCustomRepository, Repository } from 'typeorm';
import { IPurchase } from '../dtos/IPurchase';
import { Purchase } from '../entities/Purchase';
import { PurchaseRepository } from '../repositories/PurchaseRepository';

class PurchaseService {
  private repositoryPurchase: Repository<Purchase>;

  constructor() {
    this.repositoryPurchase = getCustomRepository(PurchaseRepository);
  }

  async create(data: IPurchase) {
    const purchase = this.repositoryPurchase.create(data);
    await this.repositoryPurchase.save(purchase);
    return purchase;
  }

  async read() {
    const allPurchases = await this.repositoryPurchase.find();
    return allPurchases;
  }

  async readById(id: number) {
    const purchase = await this.repositoryPurchase.findOne(id);
    return purchase;
  }

  async deleteById(id: number) {
    await this.repositoryPurchase.delete(id);
  }

  async updateById(id: number, data: IPurchase) {
    await this.repositoryPurchase.update(id, data);
  }
}

export { PurchaseService };
