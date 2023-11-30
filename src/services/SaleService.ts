import {
  Between,
  FindConditions,
  getCustomRepository,
  ILike,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import {
  IMountedWhere,
  IPostCashClosing,
  IReadSalesFilterPage,
  IReadSumSales,
  IReadSumSalesToday,
  ISale,
} from '../dtos/ISale';
import { EnumTypeSale, Sale } from '../entities/Sale';
import { SaleRepository } from '../repositories/SaleRepository';
import { getLocalTodayDate } from '../utils';
import { Client } from '../entities/Client';
import { ClientRepository } from '../repositories/ClientRepository';

class SaleService {
  private repositorySale: Repository<Sale>;

  private repositoryClient: Repository<Client>;

  constructor() {
    this.repositorySale = getCustomRepository(SaleRepository);
    this.repositoryClient = getCustomRepository(ClientRepository);
  }

  async create(data: ISale) {
    const sale = this.repositorySale.create(data);
    await this.repositorySale.save(sale);
    return sale;
  }

  async read() {
    const allSales = await this.repositorySale.find({
      relations: ['client'],
      order: { updated_at: 'DESC' },
    });
    return allSales;
  }

  async readById(id: number) {
    const sale = await this.repositorySale.findOne(id, {
      relations: ['client'],
    });
    return sale;
  }

  async readSalesPaged(limit: number, page: number) {
    const offset = page * limit - limit;

    const salePaged = await this.repositorySale.find({
      order: { created_at: 'DESC' },
      skip: offset,
      take: limit,
      relations: ['client'],
    });

    const total = await this.repositorySale.count();
    const totalPages = total > limit ? total / limit : 1;

    return {
      total,
      page,
      totalPages: Number.isInteger(totalPages) ? totalPages : parseInt((totalPages + 1).toString()),
      limit,
      offset: offset + limit,
      instances: salePaged,
    };
  }

  async deleteById(id: number) {
    const sale = await this.repositorySale.findOne(id);
    await this.repositorySale.remove(sale);
  }

  async updateById(id: number, data: ISale) {
    if (data.client_id) {
      const oldSale = await this.repositorySale.findOne(id);
      const client = await this.repositoryClient.findOne(data.client_id);

      if (oldSale.type_sale !== EnumTypeSale.DEBIT && data.type_sale === EnumTypeSale.DEBIT) {
        await this.repositoryClient.update(client.id, {
          ...client,
          debit: client.debit + data.total,
        });
      } else if (
        oldSale.type_sale === EnumTypeSale.DEBIT &&
        data.type_sale !== EnumTypeSale.DEBIT &&
        data.total <= client.debit
      ) {
        await this.repositoryClient.update(client.id, {
          ...client,
          debit: client.debit - data.total,
        });
      } else if (
        oldSale.type_sale === EnumTypeSale.DEBIT &&
        data.type_sale === EnumTypeSale.DEBIT
      ) {
        if (oldSale.total <= data.total) {
          const difference = data.total - oldSale.total;

          await this.repositoryClient.update(client.id, {
            ...client,
            debit: client.debit + difference,
          });
        } else {
          const difference = oldSale.total - data.total;

          if (difference <= client.debit) {
            await this.repositoryClient.update(client.id, {
              ...client,
              debit: client.debit - difference,
            });
          }
        }
      }
    }

    await this.repositorySale.update(id, data);
  }

  async readSumSalesByPeriod({ startDate, endDate, type_sale }: IReadSumSales) {
    let sumSales: any;

    if (startDate === endDate) {
      sumSales = await this.readSumOneDaySales(startDate, type_sale);
    } else {
      sumSales = type_sale
        ? await this.repositorySale
          .createQueryBuilder('sales')
          .select('SUM(total)', 'total_sales')
          .where('created_at BETWEEN :startDate AND :endDate', {
            startDate,
            endDate: `${endDate} 23:59:59`,
          })
          .andWhere('type_sale = :type_sale', { type_sale })
          .getRawOne()
        : await this.repositorySale
          .createQueryBuilder('sales')
          .select('SUM(total)', 'total_sales')
          .where('created_at BETWEEN :startDate AND :endDate', {
            startDate,
            endDate: `${endDate} 23:59:59`,
          })
          .getRawOne();
    }

    return sumSales;
  }

  async readSumOfTodaySales({ type_sale }: IReadSumSalesToday) {
    const today = getLocalTodayDate();

    const sumSales = type_sale
      ? await this.repositorySale
        .createQueryBuilder('sales')
        .select('SUM(total)', 'total_sales')
        .where("date_trunc('day', created_at) = :today", { today })
        .andWhere('type_sale = :type_sale', { type_sale })
        .getRawOne()
      : await this.repositorySale
        .createQueryBuilder('sales')
        .select('SUM(total)', 'total_sales')
        .where("date_trunc('day', created_at) = :today", { today })
        .getRawOne();

    return sumSales;
  }

  async readSumOneDaySales(singleDate: string, type_sale: EnumTypeSale) {
    const sumSales = type_sale
      ? await this.repositorySale
        .createQueryBuilder('sales')
        .select('SUM(total)', 'total_sales')
        .where("date_trunc('day', created_at) = :singleDate", { singleDate })
        .andWhere('type_sale = :type_sale', { type_sale })
        .getRawOne()
      : await this.repositorySale
        .createQueryBuilder('sales')
        .select('SUM(total)', 'total_sales')
        .where("date_trunc('day', created_at) = :singleDate", { singleDate })
        .getRawOne();

    return sumSales;
  }

  async dailyCashClosing(data: IPostCashClosing) {
    const object = data?.created_at
      ? {
        ...data,
        updated_at: data.created_at,
        type_sale: EnumTypeSale.CASH_CLOSING,
      }
      : { ...data, type_sale: EnumTypeSale.CASH_CLOSING };

    const sale = this.repositorySale.create(object);
    await this.repositorySale.save(sale);
    return sale;
  }

  async readSalesActivatedAcai() {
    const allSales = await this.repositorySale.find({
      relations: ['client'],
      where: { in_progress: true },
      order: { created_at: 'ASC' },
    });
    return allSales;
  }

  private mountedWhere({ client_id, end_date, observation, start_date }: IMountedWhere) {
    const where: string | ObjectLiteral | FindConditions<Sale> | FindConditions<Sale>[] = {};

    if (client_id) {
      where.client_id = client_id;
    }
    if (observation) {
      where.observation = ILike(`%${observation}%`);
    }
    if (start_date && end_date) {
      where.created_at = Between(`${start_date} 00:00:00`, `${end_date} 23:59:59`);
    }

    return where;
  }

  async readSalesFilterPage({
    start_date,
    end_date,
    limit,
    page,
    client_id,
    observation,
  }: IReadSalesFilterPage) {
    const offset = page * limit - limit;

    const [salePaged, total] = await this.repositorySale.findAndCount({
      order: { created_at: 'DESC' },
      skip: offset,
      take: limit,
      relations: ['client'],

      where: this.mountedWhere({ client_id, end_date, observation, start_date }),
    });

    const totalPages = total > limit ? Math.ceil(total / limit) : 1;

    return {
      total,
      page,
      totalPages,
      limit,
      offset: offset + limit,
      instances: salePaged,
    };
  }
}

export { SaleService };
