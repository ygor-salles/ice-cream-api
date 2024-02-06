import {
  Between,
  FindConditions,
  getCustomRepository,
  ILike,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { IMountedWherePayment, IPayment, IReadPaymentsFilterPage } from '../dtos/IPayment';
import { Payment } from '../entities/Payment';
import { PaymentRepository } from '../repositories/PaymentRepository';

class PaymentService {
  private repositoryPayment: Repository<Payment>;

  constructor() {
    this.repositoryPayment = getCustomRepository(PaymentRepository);
  }

  async create(data: IPayment) {
    const payment = this.repositoryPayment.create(data);
    await this.repositoryPayment.save(payment);
    return payment;
  }

  async read() {
    const allPayments = await this.repositoryPayment.find({
      relations: ['client'],
      order: { updated_at: 'DESC' },
    });
    return allPayments;
  }

  async readById(id: number) {
    const payment = await this.repositoryPayment.findOne({ relations: ['client'], where: { id } });
    return payment;
  }

  async deleteById(id: number) {
    const payment = await this.repositoryPayment.findOne(id);
    await this.repositoryPayment.remove(payment);
  }

  async updateById(id: number, data: IPayment) {
    await this.repositoryPayment.update(id, data);
  }

  private mountedWhere({ client_id, end_date, observation, start_date }: IMountedWherePayment) {
    const where: string | ObjectLiteral | FindConditions<Payment> | FindConditions<Payment>[] = {};

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

  async readPaymentsPaged({ limit, page, ...rest }: IReadPaymentsFilterPage) {
    const offset = page * limit - limit;

    const [paymentPaged, total] = await this.repositoryPayment.findAndCount({
      order: { created_at: 'DESC' },
      skip: offset,
      take: limit,
      relations: ['client'],

      where: this.mountedWhere(rest),
    });

    const totalPages = total > limit ? Math.ceil(total / limit) : 1;

    return {
      total,
      page,
      totalPages,
      limit,
      offset: offset + limit,
      instances: paymentPaged,
    };
  }
}

export { PaymentService };
