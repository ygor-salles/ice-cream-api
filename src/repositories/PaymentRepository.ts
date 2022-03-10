import { EntityRepository, Repository } from 'typeorm';
import { Payment } from '../entities/Payment';

@EntityRepository(Payment)
class PaymentRepository extends Repository<Payment> {}

export { PaymentRepository };
