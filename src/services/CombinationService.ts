import { getCustomRepository, Repository } from 'typeorm';
import { ICombination } from '../dtos/ICombination';
import { Combination } from '../entities/Combination';
import { CombinationRepository } from '../repositories/CombinationRepository';

class CombinationService {
  private repositoryCombination: Repository<Combination>;

  constructor() {
    this.repositoryCombination = getCustomRepository(CombinationRepository);
  }

  async create(data: ICombination) {
    const combination = this.repositoryCombination.create(data);
    await this.repositoryCombination.save(combination);
    return combination;
  }

  async read() {
    const allCombinations = await this.repositoryCombination.find();
    return allCombinations;
  }

  async readById(id: number) {
    const combination = await this.repositoryCombination.findOne(id);
    return combination;
  }

  async deleteById(id: number) {
    await this.repositoryCombination.delete(id);
  }

  async updateById(id: number, data: ICombination) {
    await this.repositoryCombination.update(id, data);
  }
}

export { CombinationService };
