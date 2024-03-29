import {
  Between,
  FindConditions,
  getCustomRepository,
  ILike,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { IReadSumPurchases } from '../dtos/IProvider';
import { IPurchase, IMountedWherePurchase, IReadPurchasesFilterPage } from '../dtos/IPurchase';
import { Purchase } from '../entities/Purchase';
import { PurchaseRepository } from '../repositories/PurchaseRepository';
import { getLocalTodayDate } from '../utils';

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

    if (startDate === endDate) {
      sumPurchases = this.readSumPurchasesOneDay(startDate, its_ice_cream_shoop, provider_id);
    } else if (its_ice_cream_shoop !== undefined && provider_id) {
      sumPurchases = this.repositoryPurchase
        .createQueryBuilder('purchases')
        .select('SUM(value_total)', 'total_purchases')
        .where('created_at BETWEEN :startDate AND :endDate', {
          startDate,
          endDate: `${endDate} 23:59:59`,
        })
        .andWhere('its_ice_cream_shoop = :its_ice_cream_shoop', { its_ice_cream_shoop })
        .andWhere('provider_id = :provider_id', { provider_id })
        .getRawOne();
    } else if (its_ice_cream_shoop !== undefined) {
      sumPurchases = this.repositoryPurchase
        .createQueryBuilder('purchases')
        .select('SUM(value_total)', 'total_purchases')
        .where('created_at BETWEEN :startDate AND :endDate', {
          startDate,
          endDate: `${endDate} 23:59:59`,
        })
        .andWhere('its_ice_cream_shoop = :its_ice_cream_shoop', { its_ice_cream_shoop })
        .getRawOne();
    } else if (provider_id) {
      sumPurchases = this.repositoryPurchase
        .createQueryBuilder('purchases')
        .select('SUM(value_total)', 'total_purchases')
        .where('created_at BETWEEN :startDate AND :endDate', {
          startDate,
          endDate: `${endDate} 23:59:59`,
        })
        .andWhere('provider_id = :provider_id', { provider_id })
        .getRawOne();
    } else {
      sumPurchases = this.repositoryPurchase
        .createQueryBuilder('purchases')
        .select('SUM(value_total)', 'total_purchases')
        .where('created_at BETWEEN :startDate AND :endDate', {
          startDate,
          endDate: `${endDate} 23:59:59`,
        })
        .getRawOne();
    }

    return sumPurchases;
  }

  async readSumPurchasesToday() {
    const today = getLocalTodayDate();

    const sumPurchases = await this.repositoryPurchase
      .createQueryBuilder('purchases')
      .select('SUM(value_total)', 'total_purchases')
      .where("DATE_TRUNC('day', created_at) = :today", { today })
      .getRawOne();

    return sumPurchases;
  }

  async readSumPurchasesOneDay(
    singleDate: string,
    its_ice_cream_shoop: boolean,
    provider_id: number,
  ) {
    let sumPurchases: any;

    if (its_ice_cream_shoop !== undefined && provider_id) {
      sumPurchases = await this.repositoryPurchase
        .createQueryBuilder('purchases')
        .select('SUM(value_total)', 'total_purchases')
        .where("DATE_TRUNC('day', created_at) = :singleDate", { singleDate })
        .andWhere('its_ice_cream_shoop = :its_ice_cream_shoop', { its_ice_cream_shoop })
        .andWhere('provider_id = :provider_id', { provider_id })
        .getRawOne();
    } else if (its_ice_cream_shoop !== undefined) {
      sumPurchases = await this.repositoryPurchase
        .createQueryBuilder('purchases')
        .select('SUM(value_total)', 'total_purchases')
        .where("DATE_TRUNC('day', created_at) = :singleDate", { singleDate })
        .andWhere('its_ice_cream_shoop = :its_ice_cream_shoop', { its_ice_cream_shoop })
        .getRawOne();
    } else if (provider_id) {
      sumPurchases = await this.repositoryPurchase
        .createQueryBuilder('purchases')
        .select('SUM(value_total)', 'total_purchases')
        .where("DATE_TRUNC('day', created_at) = :singleDate", { singleDate })
        .andWhere('provider_id = :provider_id', { provider_id })
        .getRawOne();
    } else {
      sumPurchases = await this.repositoryPurchase
        .createQueryBuilder('purchases')
        .select('SUM(value_total)', 'total_purchases')
        .where("DATE_TRUNC('day', created_at) = :singleDate", { singleDate })
        .getRawOne();
    }

    return sumPurchases;
  }

  private mountedWhere({ provider_id, end_date, observation, start_date }: IMountedWherePurchase) {
    const where: string | ObjectLiteral | FindConditions<Purchase> | FindConditions<Purchase>[] =
      {};

    if (provider_id) {
      where.provider_id = provider_id;
    }
    if (observation) {
      where.observation = ILike(`%${observation}%`);
    }
    if (start_date && end_date) {
      where.created_at = Between(`${start_date} 00:00:00`, `${end_date} 23:59:59`);
    }

    return where;
  }

  async readPurchasesPaged({ limit, page, ...rest }: IReadPurchasesFilterPage) {
    const offset = page * limit - limit;

    const [purchasePaged, total] = await this.repositoryPurchase.findAndCount({
      order: { created_at: 'DESC' },
      skip: offset,
      take: limit,
      relations: ['provider'],

      where: this.mountedWhere(rest),
    });

    const totalPages = total > limit ? Math.ceil(total / limit) : 1;

    return {
      total,
      page,
      totalPages,
      limit,
      offset: offset + limit,
      instances: purchasePaged,
    };
  }
}

export { PurchaseService };
