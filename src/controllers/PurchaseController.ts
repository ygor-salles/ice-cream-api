import { Request, Response } from 'express';
import { IPurchase } from '../dtos/IPurchase';
import { PurchaseService } from '../services/PurchaseService';
import { PurchaseValidator } from '../validators/PurchaseValidator';
import { ApiError } from '../validators/Exceptions/ApiError';

class PurchaseController {
  async create(request: Request, response: Response) {
    const { ...data }: IPurchase = request.body;

    const purchaseValidator = new PurchaseValidator();
    try {
      await purchaseValidator.createValidation().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message || error);
    }
    const purchaseService = new PurchaseService();
    const purchase = await purchaseService.create(data);
    return response.status(201).json(purchase);
  }

  async read(request: Request, response: Response) {
    const purchaseService = new PurchaseService();
    const purchase = await purchaseService.read();
    return response.status(200).json(purchase);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const purchaseValidator = new PurchaseValidator();
    try {
      await purchaseValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await purchaseValidator.idExist(+id))) throw new ApiError(404, 'Purchase does not exist');

    const purchaseService = new PurchaseService();
    const purchase = await purchaseService.readById(+id);
    return response.status(200).json(purchase);
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const purchaseValidator = new PurchaseValidator();
    try {
      await purchaseValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message);
    }
    if (!(await purchaseValidator.idExist(+id))) throw new ApiError(404, 'Purchase does not exist');

    const purchaseService = new PurchaseService();
    await purchaseService.deleteById(+id);
    return response.status(200).json({ message: 'Purchase deleted successfully' });
  }

  async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { ...data }: IPurchase = request.body;

    const purchaseValidator = new PurchaseValidator();
    try {
      await purchaseValidator
        .updateValidation()
        .validate({ id: +id, ...data }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await purchaseValidator.idExist(+id))) throw new ApiError(404, 'Purchase does not exist');

    const purchaseService = new PurchaseService();
    await purchaseService.updateById(+id, data);
    return response.status(200).json({ message: 'Purchase updated successfully' });
  }
}

export { PurchaseController };
