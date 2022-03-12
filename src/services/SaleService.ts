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

  async deleteById(id: number) {
    await this.repositorySale.delete(id);
  }

  async updateById(id: number, data: ISale) {
    await this.repositorySale.update(id, data);
  }
}

export { SaleService };
