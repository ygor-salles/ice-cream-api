import { EntityRepository, Repository } from 'typeorm';
import { Combination } from '../entities/Combination';

@EntityRepository(Combination)
class CombinationRepository extends Repository<Combination> {}

export { CombinationRepository };
