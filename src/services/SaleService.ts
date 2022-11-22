import { getCustomRepository, Repository } from 'typeorm';
import { ISale } from '../dtos/ISale';
import { Sale } from '../entities/Sale';
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
    const allSales = await this.repositorySale.find();
    return allSales;
  }

  async readById(id: number) {
    const sale = await this.repositorySale.findOne(id);
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
    await this.repositorySale.delete(id);
  }

  async updateById(id: number, data: ISale) {
    await this.repositorySale.update(id, data);
  }
}

export { SaleService };
