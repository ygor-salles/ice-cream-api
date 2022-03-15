import { EntityRepository, Repository } from 'typeorm';
import { Sale } from '../entities/Sale';

@EntityRepository(Sale)
class SaleRepository extends Repository<Sale> {}

export { SaleRepository };
