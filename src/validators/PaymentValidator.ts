import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { PaymentRepository } from '../repositories/PaymentRepository';

class PaymentValidator {
  async idExist(id: number): Promise<Boolean> {
    const repository = getCustomRepository(PaymentRepository);
    const payment = await repository.findOne(id);
    return !!payment;
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
}

export { PaymentValidator };
