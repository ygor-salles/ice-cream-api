import * as yup from 'yup';
import { getCustomRepository } from 'typeorm';
import { PurchaseRepository } from '../repositories/PurchaseRepository';
import { Purchase } from '../entities/Purchase';

class PurchaseValidator {
  async idExist(id: number): Promise<Purchase> {
    const repository = getCustomRepository(PurchaseRepository);
    const purchase = await repository.findOne(id);
    return purchase;
  }

  isRangeDateValid(start_date: string, end_date: string): boolean {
    if (start_date && !end_date) return false;

    if (!start_date && end_date) return false;

    if (new Date(start_date) > new Date(end_date)) return false;

    return true;
  }

  deleteByIdValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      value_total: yup.number().optional(),
      observation: yup.string().optional(),
      its_ice_cream_shoop: yup.boolean().optional(),
      provider_id: yup.number().optional(),
    });
  }

  createValidation() {
    return yup.object().shape({
      value_total: yup.number().required('Value total is required'),
      observation: yup.string().optional(),
      its_ice_cream_shoop: yup.boolean().required('Its_ice_cream_shoop is required'),
      provider_id: yup.number().required('Provider_id is required'),
      created_at: yup.date().optional(),
    });
  }

  readByIdValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
    });
  }

  readSumPurchasesByPeriod() {
    return yup.object().shape({
      startDate: yup.string().required('StartDate is required'),
      endDate: yup.string().required('EndDate is required'),
      its_ice_cream_shoop: yup.bool().optional(),
      provider_id: yup.number().optional(),
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
      provider_id: yup.string().optional(),
      observation: yup.string().optional(),
      start_date: yup.string().optional(),
      end_date: yup.string().optional(),
    });
  }
}

export { PurchaseValidator };
