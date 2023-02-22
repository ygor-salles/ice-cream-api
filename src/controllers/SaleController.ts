/* eslint-disable radix */
import { Request, Response } from 'express';
import { IPostCashClosing, IReadSumSales, IReadSumSalesToday, ISale } from '../dtos/ISale';
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
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }

    const saleService = new SaleService();
    const sale = await saleService.create(data);
    response.status(201).json(sale);
  }

  async read(request: Request, response: Response) {
    const saleService = new SaleService();
    const sale = await saleService.read();
    response.status(200).json(sale);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const saleValidator = new SaleValidator();
    try {
      await saleValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await saleValidator.idExist(+id))) throw new ApiError(400, 'Sale does not exist');

    const saleService = new SaleService();
    const sale = await saleService.readById(+id);
    response.status(200).json(sale);
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const saleValidator = new SaleValidator();
    try {
      await saleValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await saleValidator.idExist(+id))) throw new ApiError(400, 'Sale does not exist');

    const saleService = new SaleService();
    await saleService.deleteById(+id);
    response.status(200).json({ message: 'Sale deleted successfully' });
  }

  async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { ...data }: ISale = request.body;

    const saleValidator = new SaleValidator();
    try {
      await saleValidator.updateValidation().validate({ id: +id, ...data }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await saleValidator.idExist(+id))) throw new ApiError(400, 'Sale does not exist');

    const saleService = new SaleService();
    await saleService.updateById(+id, data);
    response.status(200).json({ message: 'Sale updated successfully' });
  }

  async readSalesPaged(request: Request, response: Response) {
    let { limit, page }: any = request.query;
    limit = parseInt(limit || 1);
    page = parseInt(page || 1);

    const validator = new SaleValidator();
    try {
      await validator.readPagedValidation().validate({ limit, page }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }

    const saleService = new SaleService();
    const allSalesPaged = await saleService.readSalesPaged(limit, page);
    response.status(200).json(allSalesPaged);
  }

  async readSumSalesByPeriod(request: Request, response: Response) {
    const data: IReadSumSales = request.body;

    const saleValidator = new SaleValidator();
    try {
      await saleValidator.readSumSalesByPeriod().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }

    const saleService = new SaleService();
    const sumSale = await saleService.readSumSalesByPeriod(data);
    response.status(200).json({ ...sumSale });
  }

  async readSumOfTodaySales(request: Request, response: Response) {
    const data: IReadSumSalesToday = request.body;

    const saleValidator = new SaleValidator();
    try {
      await saleValidator.readSumOfTodaySales().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }

    const saleService = new SaleService();
    const sumSales = await saleService.readSumOfTodaySales(data);
    response.status(200).json({ ...sumSales });
  }

  async dailyCashClosing(request: Request, response: Response) {
    const data: IPostCashClosing = request.body;

    const saleValidator = new SaleValidator();
    try {
      await saleValidator.cashClosing().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }

    const saleService = new SaleService();
    const sale = await saleService.dailyCashClosing(data);
    response.status(200).json(sale);
  }
}

export { SaleController };
