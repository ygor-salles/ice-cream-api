import { Request, Response } from 'express';
import {
  IPostCashClosing,
  IReadSalesFilterPage,
  IReadSalesFilterPageQuery,
  IReadSumSales,
  IReadSumSalesToday,
  ISale,
} from '../dtos/ISale';
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

  async readSalesActivatedAcai(request: Request, response: Response) {
    const saleService = new SaleService();
    const allSales = await saleService.readSalesActivatedAcai();
    response.status(200).json(allSales);
  }

  async readFilterSalePage(request: Request, response: Response) {
    const { limit, page, client_id, end_date, observation, start_date }: IReadSalesFilterPageQuery =
      request.query;
    const limitNum = parseInt(limit) || 1;
    const pageNum = parseInt(page) || 1;
    const dataFormmated: IReadSalesFilterPage = {
      client_id,
      end_date,
      observation,
      start_date,
      limit: limitNum,
      page: pageNum,
    };

    const saleValidator = new SaleValidator();
    try {
      await saleValidator.readSalesFilterPage().validate(dataFormmated, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!saleValidator.isRangeDateValid(start_date, end_date)) {
      throw new ApiError(400, 'Range date incorrect');
    }

    const saleService = new SaleService();
    const salesFilterPage = await saleService.readSalesFilterPage(dataFormmated);
    response.status(200).json(salesFilterPage);
  }
}

export { SaleController };
