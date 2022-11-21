import { getCustomRepository, Repository } from 'typeorm';
import { IPayment } from '../dtos/IPayment';
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
    const allPayments = await this.repositoryPayment.find({ relations: ['client'] });
    return allPayments;
  }

  async readById(id: number) {
    const payment = await this.repositoryPayment.findOne({ relations: ['client'], where: { id } });
    return payment;
  }

  async deleteById(id: number) {
    await this.repositoryPayment.delete(id);
  }

  async updateById(id: number, data: IPayment) {
    await this.repositoryPayment.update(id, data);
  }
}

export { PaymentService };
