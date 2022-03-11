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

  // async read(request: Request, response: Response) {}

  // async readById(request: Request, response: Response) {}

  // async deleteById(request: Request, response: Response) {}

  // async updateById(request: Request, response: Response) {}
}

export { PurchaseController };
