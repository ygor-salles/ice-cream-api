import { getCustomRepository, Repository } from 'typeorm';
import { IReadSumPurchases } from '../dtos/IProvider';
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
    const allPurchases = await this.repositoryPurchase.find({
      order: { updated_at: 'DESC' },
      relations: ['provider'],
    });
    return allPurchases;
  }

  async readById(id: number) {
    const purchase = await this.repositoryPurchase.findOne(id, { relations: ['provider'] });
    return purchase;
  }

  async deleteById(id: number) {
    await this.repositoryPurchase.delete(id);
  }

  async updateById(id: number, data: IPurchase) {
    await this.repositoryPurchase.update(id, data);
  }

  async readSumPurchasesByPeriod({
    startDate,
    endDate,
    its_ice_cream_shoop,
    provider_id,
  }: IReadSumPurchases) {
    let sumPurchases: any;

    if (its_ice_cream_shoop !== undefined && provider_id) {
      sumPurchases = this.repositoryPurchase
        .createQueryBuilder('purchases')
        .select('SUM(purchases.value_total)', 'total_purchases')
        .where('purchases.created_at BETWEEN :startDate AND :endDate', { startDate, endDate })
        .andWhere('purchases.its_ice_cream_shoop = :its_ice_cream_shoop', { its_ice_cream_shoop })
        .andWhere('purchases.provider_id = :provider_id', { provider_id })
        .getRawOne();
    } else if (its_ice_cream_shoop !== undefined) {
      sumPurchases = this.repositoryPurchase
        .createQueryBuilder('purchases')
        .select('SUM(purchases.value_total)', 'total_purchases')
        .where('purchases.created_at BETWEEN :startDate AND :endDate', { startDate, endDate })
        .andWhere('purchases.its_ice_cream_shoop = :its_ice_cream_shoop', { its_ice_cream_shoop })
        .getRawOne();
    } else if (provider_id) {
      sumPurchases = this.repositoryPurchase
        .createQueryBuilder('purchases')
        .select('SUM(purchases.value_total)', 'total_purchases')
        .where('purchases.created_at BETWEEN :startDate AND :endDate', { startDate, endDate })
        .andWhere('purchases.provider_id = :provider_id', { provider_id })
        .getRawOne();
    } else {
      sumPurchases = this.repositoryPurchase
        .createQueryBuilder('purchases')
        .select('SUM(purchases.value_total)', 'total_purchases')
        .where('purchases.created_at BETWEEN :startDate AND :endDate', { startDate, endDate })
        .getRawOne();
    }

    return sumPurchases;
  }
}

export { PurchaseService };
