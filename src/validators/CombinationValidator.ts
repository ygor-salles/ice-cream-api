import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { CombinationRepository } from '../repositories/CombinationRepository';

class CombinationValidator {
  async idExist(id: number): Promise<Boolean> {
    const repository = getCustomRepository(CombinationRepository);
    const combination = await repository.findOne(id);
    return !!combination;
  }

  async nameExist(name: string): Promise<Boolean> {
    const repository = getCustomRepository(CombinationRepository);
    const combination = await repository.findOne({ name });
    return !!combination;
  }

  createValidaton() {
    return yup.object().shape({
      name: yup.string().required('Name is required'),
      price: yup.number().required('Price is required'),
      product_id: yup.number().required('Product_id is required'),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      name: yup.string().optional(),
      price: yup.number().optional(),
      product_id: yup.number().optional(),
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

export { CombinationValidator };
