import { Request, Response } from 'express';
import { ISale } from '../dtos/ISale';
import { SaleService } from '../services/SaleService';
import { ApiError } from '../validators/Exceptions/ApiError';
import { SaleValidator } from '../validators/SaleValidator';

class SaleController {
  async create(request: Request, response: Response) {
    const { ...data }: ISale = request.body;

    const saleValidator = new SaleValidator();
    try {
      await saleValidator.createValidaton().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message || error);
    }

    const saleService = new SaleService();
    const sale = await saleService.create(data);
    return response.status(201).json(sale);
  }

  async read(request: Request, response: Response) {
    const saleService = new SaleService();
    const sale = await saleService.read();
    return response.status(200).json(sale);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const saleValidator = new SaleValidator();
    try {
      await saleValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await saleValidator.idExist(+id))) throw new ApiError(404, 'Sale does not exist');

    const saleService = new SaleService();
    const sale = await saleService.readById(+id);
    return response.status(200).json(sale);
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const saleValidator = new SaleValidator();
    try {
      await saleValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await saleValidator.idExist(+id))) throw new ApiError(404, 'Sale does not exist');

    const saleService = new SaleService();
    await saleService.deleteById(+id);
    return response.status(200).json({ message: 'Sale deleted successfully' });
  }

  async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { ...data }: ISale = request.body;

    const saleValidator = new SaleValidator();
    try {
      await saleValidator.updateValidation().validate({ id: +id, ...data }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await saleValidator.idExist(+id))) throw new ApiError(404, 'Sale does not exist');

    const saleService = new SaleService();
    await saleService.updateById(+id, data);
    return response.status(200).json({ message: 'Sale updated successfully' });
  }
}

export { SaleController };
