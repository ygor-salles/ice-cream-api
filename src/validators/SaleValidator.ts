import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { EnumTypeProduct } from '../entities/Product';
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
      client_id: yup.number().optional(),
      in_progress: yup.bool().optional(),
      data_product: yup
        .array()
        .of(
          yup.object().shape({
            amount: yup.number().required('Amount data_product is required'),
            name: yup.string().required('Name data_product is required'),
            price: yup.number().required('Price data_product is required'),
            combinations: yup
              .array()
              .of(
                yup.object().shape({
                  name: yup.string(),
                  price: yup.number(),
                }),
              )
              .optional(),
            type: yup
              .mixed<EnumTypeProduct>()
              .oneOf(Object.values(EnumTypeProduct))
              .required('Type data_product is required'),
            total: yup.number().required('Total is required'),
          }),
        )
        .required('Data_product is required'),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup.number().optional(),
      total: yup.number().optional(),
      type_sale: yup.mixed<EnumTypeSale>().oneOf(Object.values(EnumTypeSale)).optional(),
      observation: yup.string().nullable().optional(),
      client_id: yup.number().optional(),
      in_progress: yup.bool().optional(),
      data_product: yup
        .array()
        .of(
          yup.object().shape({
            amount: yup.number().optional(),
            name: yup.string().optional(),
            price: yup.number().optional(),
            combinations: yup
              .array()
              .of(
                yup.object().shape({
                  name: yup.string(),
                  price: yup.number(),
                }),
              )
              .optional(),
            type: yup.mixed<EnumTypeProduct>().oneOf(Object.values(EnumTypeProduct)).optional(),
            total: yup.number().optional(),
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

  readSalesFilterPage() {
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
      client_name: yup.string().optional(),
      observation: yup.string().optional(),
      start_date: yup.string().optional(),
      end_date: yup.string().optional(),
    });
  }
}

export { SaleValidator };
