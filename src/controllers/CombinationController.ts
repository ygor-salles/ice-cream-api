import { Request, Response } from 'express';
import { ICombination } from '../dtos/ICombination';
import { CombinationService } from '../services/CombinationService';
import { ApiError } from '../validators/Exceptions/ApiError';
import { CombinationValidator } from '../validators/CombinationValidator';

class CombinationController {
  async create(request: Request, response: Response) {
    const { ...data }: ICombination = request.body;

    const combinationValidator = new CombinationValidator();
    try {
      await combinationValidator.createValidaton().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message || error);
    }
    if (await combinationValidator.nameExist(data.name))
      throw new ApiError(400, 'Combination already exists');

    const combinationService = new CombinationService();
    const combination = await combinationService.create(data);
    return response.status(201).json(combination);
  }

  async read(request: Request, response: Response) {
    const combinationService = new CombinationService();
    const combination = await combinationService.read();
    return response.status(200).json(combination);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const combinationValidator = new CombinationValidator();
    try {
      await combinationValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await combinationValidator.idExist(+id)))
      throw new ApiError(404, 'Combination does not exist');

    const combinationService = new CombinationService();
    const combination = await combinationService.readById(+id);
    return response.status(200).json(combination);
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const combinationValidator = new CombinationValidator();
    try {
      await combinationValidator
        .deleteByIdValidation()
        .validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await combinationValidator.idExist(+id)))
      throw new ApiError(404, 'Combination does not exist');

    const combinationService = new CombinationService();
    await combinationService.deleteById(+id);
    return response.status(200).json({ message: 'Combination deleted successfully' });
  }

  async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { ...data }: ICombination = request.body;

    const combinationValidator = new CombinationValidator();
    try {
      await combinationValidator
        .updateValidation()
        .validate({ id: +id, ...data }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await combinationValidator.idExist(+id)))
      throw new ApiError(404, 'Combination does not exist');

    const combinationService = new CombinationService();
    await combinationService.updateById(+id, data);
    return response.status(200).json({ message: 'Combination updated successfully' });
  }
}

export { CombinationController };
