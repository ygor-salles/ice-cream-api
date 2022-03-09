import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {}

export { ProductRepository };
