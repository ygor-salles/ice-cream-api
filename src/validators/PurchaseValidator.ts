import * as yup from 'yup';
// import { getCustomRepository } from 'typeorm';
// import { PurchaseRepository } from '../repositories/PurchaseRepository';

class PurchaseValidator {
  createValidation() {
    return yup.object().shape({
      value: yup.number().required('Value is required'),
      observation: yup.string().optional(),
      its_ice_cream_shoop: yup.boolean().required('Its_ice_cream_shoop is required'),
      nf_url: yup.string().required('Nf_url is required'),
    });
  }
}

export { PurchaseValidator };
