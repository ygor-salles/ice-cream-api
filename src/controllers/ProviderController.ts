import { Request, Response } from 'express';
import { IProvider } from '../dtos/IProvider';
import { ProviderService } from '../services/ProviderService';
import { ApiError } from '../validators/Exceptions/ApiError';
import { ProviderValidator } from '../validators/ProviderValidator';

class ProviderController {
  async create(request: Request, response: Response) {
    const { ...data }: IProvider = request.body;

    const providerValidator = new ProviderValidator();
    try {
      await providerValidator.createValidaton().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (await providerValidator.nameExist(data.name))
      throw new ApiError(400, 'Provider already exists');

    const providerService = new ProviderService();
    const provider = await providerService.create(data);
    response.status(201).json(provider);
  }

  async read(request: Request, response: Response) {
    const providerService = new ProviderService();
    const provider = await providerService.read();
    response.status(200).json(provider);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const providerValidator = new ProviderValidator();
    try {
      await providerValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await providerValidator.idExist(+id))) throw new ApiError(400, 'Provider does not exist');

    const providerService = new ProviderService();
    const provider = await providerService.readById(+id);
    response.status(200).json(provider);
  }

  async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { ...data }: IProvider = request.body;

    const providerValidator = new ProviderValidator();
    try {
      await providerValidator
        .updateValidation()
        .validate({ id: +id, ...data }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await providerValidator.idExist(+id))) throw new ApiError(400, 'Provider does not exist');

    const providerService = new ProviderService();
    await providerService.updateById(+id, data);
    response.status(200).json({ message: 'Provider updated successfully' });
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const providerValidator = new ProviderValidator();
    try {
      await providerValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await providerValidator.idExist(+id))) throw new ApiError(400, 'Provider does not exist');

    const providerService = new ProviderService();
    await providerService.deleteById(+id);
    response.status(200).json({ message: 'Provider deleted successfully' });
  }
}

export { ProviderController };
