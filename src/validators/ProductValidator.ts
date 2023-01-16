import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { EnumTypeProduct } from '../entities/Product';
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
      type: yup
        .mixed<EnumTypeProduct>()
        .oneOf(Object.values(EnumTypeProduct))
        .required('Type_product is required'),
      status: yup.boolean().optional(),
      combinations: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.number(),
            name: yup.string(),
            price: yup.number(),
            created_at: yup.date(),
            updated_at: yup.date(),
          }),
        )
        .optional(),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      name: yup.string().optional(),
      price: yup.number().optional(),
      description: yup.string().optional(),
      type: yup.mixed<EnumTypeProduct>().oneOf(Object.values(EnumTypeProduct)).optional(),
      status: yup.boolean().optional(),
      combinations: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.number(),
            name: yup.string(),
            price: yup.number(),
            created_at: yup.date(),
            updated_at: yup.date(),
          }),
        )
        .optional(),
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
