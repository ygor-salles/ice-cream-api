import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { EnumTypeSale } from '../entities/Sale';
import { SaleRepository } from '../repositories/SaleRepository';

class SaleValidator {
  async idExist(id: number): Promise<Boolean> {
    const repository = getCustomRepository(SaleRepository);
    const sale = await repository.findOne(id);
    return !!sale;
  }

  createValidaton() {
    return yup.object().shape({
      total: yup.number().required('Total is required'),
      type_sale: yup
        .mixed<EnumTypeSale>()
        .oneOf(Object.values(EnumTypeSale))
        .required('Type_sale is required'),
      observation: yup.string().optional(),
      product_id: yup.number().required('Product_id is required'),
      client_id: yup.number().optional(),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      total: yup.number().optional(),
      type_sale: yup.mixed<EnumTypeSale>().oneOf(Object.values(EnumTypeSale)).optional(),
      observation: yup.string().optional(),
      product_id: yup.number().optional(),
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

export { SaleValidator };
