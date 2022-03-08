import { EntityRepository, Repository } from 'typeorm';
import { Provider } from '../entities/Provider';

@EntityRepository(Provider)
class ProviderRepository extends Repository<Provider> {}

export { ProviderRepository };
