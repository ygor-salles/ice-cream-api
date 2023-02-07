/* eslint-disable no-throw-literal */
import { Request, Response } from 'express';
import { IPurchaseMultipart } from '../dtos/IPurchase';
import { PurchaseService } from '../services/PurchaseService';
import { PurchaseValidator } from '../validators/PurchaseValidator';
import { ApiError } from '../validators/Exceptions/ApiError';
import { removeImage, uploadImage } from './UploadController';
import { formaterDataPurchase } from '../utils';

class PurchaseController {
  async create(request: Request, response: Response) {
    const dataMultipart: IPurchaseMultipart = request.body;
    const data = formaterDataPurchase(dataMultipart);

    const purchaseValidator = new PurchaseValidator();
    try {
      await purchaseValidator.createValidation().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }

    if (request.file) {
      data.nf_url = (await uploadImage(data, 'nf_url', request)) || '';
    }

    const purchaseService = new PurchaseService();
    const purchase = await purchaseService.create(data);
    response.status(201).json(purchase);
  }

  async read(request: Request, response: Response) {
    const purchaseService = new PurchaseService();
    const purchase = await purchaseService.read();
    response.status(200).json(purchase);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const purchaseValidator = new PurchaseValidator();
    try {
      await purchaseValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await purchaseValidator.idExist(+id))) throw new ApiError(400, 'Purchase does not exist');

    const purchaseService = new PurchaseService();
    const purchase = await purchaseService.readById(+id);
    response.status(200).json(purchase);
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const purchaseValidator = new PurchaseValidator();
    try {
      await purchaseValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await purchaseValidator.idExist(+id))) throw new ApiError(400, 'Purchase does not exist');

    const purchaseService = new PurchaseService();
    await removeImage(Number(id), purchaseService);

    await purchaseService.deleteById(+id);
    response.status(200).json({ message: 'Purchase deleted successfully' });
  }

  async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const dataMultipart: IPurchaseMultipart = request.body;

    const data = formaterDataPurchase(dataMultipart);

    const purchaseValidator = new PurchaseValidator();
    try {
      await purchaseValidator
        .updateValidation()
        .validate({ id: +id, ...data }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await purchaseValidator.idExist(+id))) throw new ApiError(400, 'Purchase does not exist');

    const purchaseService = new PurchaseService();
    if (request.file) {
      data.nf_url = (await uploadImage(data, 'nf_url', request)) || '';
      await removeImage(Number(id), purchaseService);
    }

    await purchaseService.updateById(+id, data);
    response.status(200).json({ message: 'Purchase updated successfully' });
  }
}

export { PurchaseController };
