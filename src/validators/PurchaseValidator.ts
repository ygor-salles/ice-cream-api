import * as yup from 'yup';
import { getCustomRepository } from 'typeorm';
import { PurchaseRepository } from '../repositories/PurchaseRepository';

class PurchaseValidator {
  async idExist(id: number): Promise<Boolean> {
    const repository = getCustomRepository(PurchaseRepository);
    const client = await repository.findOne(id);
    return !!client;
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
      nf_url: yup.string().optional(),
    });
  }

  createValidation() {
    return yup.object().shape({
      value_total: yup.number().required('Value total is required'),
      observation: yup.string().optional(),
      its_ice_cream_shoop: yup.boolean().required('Its_ice_cream_shoop is required'),
      nf_url: yup.string().required('Nf_url is required'),
    });
  }

  readByIdValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
    });
  }
}

export { PurchaseValidator };
