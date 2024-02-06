import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { PaymentRepository } from '../repositories/PaymentRepository';

class PaymentValidator {
  async idExist(id: number): Promise<Boolean> {
    const repository = getCustomRepository(PaymentRepository);
    const payment = await repository.findOne(id);
    return !!payment;
  }

  isRangeDateValid(start_date: string, end_date: string): boolean {
    if (start_date && !end_date) return false;

    if (!start_date && end_date) return false;

    if (new Date(start_date) > new Date(end_date)) return false;

    return true;
  }

  createValidaton() {
    return yup.object().shape({
      value: yup.number().required('Value is required'),
      observation: yup.string().optional(),
      client_id: yup.number().required('Client_id is required'),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      value: yup.string().optional(),
      observation: yup.string().optional(),
      client_id: yup.number().optional(),
    });
  }

  deleteByIdValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
    });
  }

  readByIdValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
    });
  }

  readPagedValidation() {
    return yup.object().shape({
      limit: yup
        .number()
        .min(1, 'Minimum limit per page is 1')
        .max(100, 'Maximum limit per page is 100')
        .required('Limit is required in query params'),
      page: yup
        .number()
        .min(1, 'Minimum limit per page is 1')
        .required('Limit is required in query params'),
      client_id: yup.string().optional(),
      observation: yup.string().optional(),
      start_date: yup.string().optional(),
      end_date: yup.string().optional(),
    });
  }
}

export { PaymentValidator };
