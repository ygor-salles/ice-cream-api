import { getCustomRepository, Repository } from 'typeorm';
import { IReadSumSales, IReadSumSalesToday, ISale } from '../dtos/ISale';
import { EnumTypeSale, Sale } from '../entities/Sale';
import { SaleRepository } from '../repositories/SaleRepository';

class SaleService {
  private repositorySale: Repository<Sale>;

  constructor() {
    this.repositorySale = getCustomRepository(SaleRepository);
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
    const sale = await this.repositorySale.findOne(id, { relations: ['client'] });
    return sale;
  }

  async readSalesPaged(limit: number, page: number) {
    const offset = page * limit - limit;

    const salePaged = await this.repositorySale.find({
      order: { updated_at: 'DESC' },
      skip: offset,
      take: limit,
      relations: ['client'],
    });

    const total = await this.repositorySale.count();
    const totalPages = total > limit ? total / limit : 1;

    return {
      total,
      page,
      // eslint-disable-next-line radix
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
            .select('SUM(sales.total)', 'total_sales')
            .where('sales.created_at BETWEEN :startDate AND :endDate', { startDate, endDate })
            .andWhere('sales.type_sale = :type_sale', { type_sale })
            .getRawOne()
        : await this.repositorySale
            .createQueryBuilder('sales')
            .select('SUM(sales.total)', 'total_sales')
            .where('sales.created_at BETWEEN :startDate AND :endDate', { startDate, endDate })
            .getRawOne();
    }

    return sumSales;
  }

  async readSumOfTodaySales({ type_sale }: IReadSumSalesToday) {
    let today: Date | string = new Date();
    today = today.toISOString().substring(0, 10);

    const sumSales = type_sale
      ? await this.repositorySale
          .createQueryBuilder('sales')
          .select('SUM(sales.total)', 'total_sales')
          .where("date_trunc('day', sales.created_at) = :today", { today })
          .andWhere('sales.type_sale = :type_sale', { type_sale })
          .getRawOne()
      : await this.repositorySale
          .createQueryBuilder('sales')
          .select('SUM(sales.total)', 'total_sales')
          .where("date_trunc('day', sales.created_at) = :today", { today })
          .getRawOne();

    return sumSales;
  }

  async readSumOneDaySales(singleDate: string, type_sale: EnumTypeSale) {
    const sumSales = type_sale
      ? await this.repositorySale
          .createQueryBuilder('sales')
          .select('SUM(sales.total)', 'total_sales')
          .where("date_trunc('day', sales.created_at) = :singleDate", { singleDate })
          .andWhere('sales.type_sale = :type_sale', { type_sale })
          .getRawOne()
      : await this.repositorySale
          .createQueryBuilder('sales')
          .select('SUM(sales.total)', 'total_sales')
          .where("date_trunc('day', sales.created_at) = :singleDate", { singleDate })
          .getRawOne();

    return sumSales;
  }
}

export { SaleService };
