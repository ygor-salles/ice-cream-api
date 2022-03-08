import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { ProviderRepository } from '../repositories/ProviderRepository';

class ProviderValidator {
  async idExist(id: number): Promise<Boolean> {
    const repository = getCustomRepository(ProviderRepository);
    const provider = await repository.findOne(id);
    return !!provider;
  }

  async nameExist(name: string): Promise<Boolean> {
    const repository = getCustomRepository(ProviderRepository);
    const provider = await repository.findOne({ name });
    return !!provider;
  }

  createValidaton() {
    return yup.object().shape({
      name: yup.string().required('Name is required'),
      phone: yup.string().optional(),
      its_ice_cream_shoop: yup.boolean().required('Its_ice_cream_shoop is required'),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      name: yup.string().optional(),
      phone: yup.string().optional(),
      its_ice_cream_shoop: yup.boolean().optional(),
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

export { ProviderValidator };
