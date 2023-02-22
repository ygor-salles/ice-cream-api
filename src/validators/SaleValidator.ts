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
      amount: yup.number().required('Amount is required'),
      client_id: yup.number().optional(),
      data_product: yup
        .object()
        .shape({
          id: yup.number().required('Id data_product is required'),
          name: yup.string().required('Name data_product is required'),
          price: yup.number().required('Price data_product is required'),
        })
        .required('Data_product is required'),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      total: yup.number().optional(),
      type_sale: yup.mixed<EnumTypeSale>().oneOf(Object.values(EnumTypeSale)).optional(),
      observation: yup.string().optional(),
      amount: yup.number().optional(),
      client_id: yup.number().optional(),
      data_product: yup
        .object()
        .shape({
          id: yup.number().required('Id data_product is required'),
          name: yup.string().required('Name data_product is required'),
          price: yup.number().required('Price data_product is required'),
        })
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
    });
  }

  readSumSalesByPeriod() {
    return yup.object().shape({
      startDate: yup.string().required('StartDate is required'),
      endDate: yup.string().required('EndDate is required'),
      type_sale: yup.mixed<EnumTypeSale>().oneOf(Object.values(EnumTypeSale)).optional(),
    });
  }

  readSumOfTodaySales() {
    return yup.object().shape({
      type_sale: yup.mixed<EnumTypeSale>().oneOf(Object.values(EnumTypeSale)).optional(),
    });
  }

  cashClosing() {
    return yup.object().shape({
      total: yup.number().required('Total is required'),
      created_at: yup.date().optional(),
    });
  }
}

export { SaleValidator };
