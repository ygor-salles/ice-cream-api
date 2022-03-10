import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { ProductRepository } from '../repositories/ProductRepository';

class ProductValidator {
  async idExist(id: number): Promise<Boolean> {
    const repository = getCustomRepository(ProductRepository);
    const product = await repository.findOne(id);
    return !!product;
  }

  async nameExist(name: string): Promise<Boolean> {
    const repository = getCustomRepository(ProductRepository);
    const product = await repository.findOne({ name });
    return !!product;
  }

  createValidaton() {
    return yup.object().shape({
      name: yup.string().required('Name is required'),
      price: yup.number().optional(),
      description: yup.string().optional(),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      name: yup.string().optional(),
      price: yup.number().optional(),
      description: yup.string().optional(),
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

export { ProductValidator };
