import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { ClientRepository } from '../repositories/ClientRepository';

class ClientValidator {
  async idExist(id: number): Promise<Boolean> {
    const repository = getCustomRepository(ClientRepository);
    const client = await repository.findOne(id);
    return !!client;
  }

  async nameExist(name: string): Promise<Boolean> {
    const repository = getCustomRepository(ClientRepository);
    const client = await repository.findOne({ name });
    return !!client;
  }

  createValidaton() {
    return yup.object().shape({
      name: yup.string().required('Name is required'),
      phone: yup.string().optional(),
      debit: yup.number().required('Debit is required'),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      name: yup.string().optional(),
      phone: yup.string().optional(),
      debit: yup.number().optional(),
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

export { ClientValidator };
