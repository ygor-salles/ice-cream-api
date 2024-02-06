import { Request, Response } from 'express';
import { IPayment, IReadPaymentsFilterPage, IReadPaymentsFilterPageQuery } from '../dtos/IPayment';
import { PaymentService } from '../services/PaymentService';
import { ApiError } from '../validators/Exceptions/ApiError';
import { PaymentValidator } from '../validators/PaymentValidator';

class PaymentController {
  async create(request: Request, response: Response) {
    const { ...data }: IPayment = request.body;

    const paymentValidator = new PaymentValidator();
    try {
      await paymentValidator.createValidaton().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }

    const paymentService = new PaymentService();
    const payment = await paymentService.create(data);
    response.status(201).json(payment);
  }

  async read(request: Request, response: Response) {
    const paymentService = new PaymentService();
    const payment = await paymentService.read();
    response.status(200).json(payment);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const paymentValidator = new PaymentValidator();
    try {
      await paymentValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await paymentValidator.idExist(+id))) throw new ApiError(400, 'Payment does not exist');

    const paymentService = new PaymentService();
    const payment = await paymentService.readById(+id);
    response.status(200).json(payment);
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const paymentValidator = new PaymentValidator();
    try {
      await paymentValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await paymentValidator.idExist(+id))) throw new ApiError(400, 'Payment does not exist');

    const paymentService = new PaymentService();
    await paymentService.deleteById(+id);
    response.status(200).json({ message: 'Payment deleted successfully' });
  }

  async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { ...data }: IPayment = request.body;

    const paymentValidator = new PaymentValidator();
    try {
      await paymentValidator
        .updateValidation()
        .validate({ id: +id, ...data }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await paymentValidator.idExist(+id))) throw new ApiError(400, 'Payment does not exist');

    const paymentService = new PaymentService();
    await paymentService.updateById(+id, data);
    response.status(200).json({ message: 'Payment updated successfully' });
  }

  async readPaymentsPaged(request: Request, response: Response) {
    const { limit, page, ...rest }: IReadPaymentsFilterPageQuery = request.query;
    const limitNum = parseInt(limit) || 1;
    const pageNum = parseInt(page) || 1;

    const dataFormmated: IReadPaymentsFilterPage = { ...rest, limit: limitNum, page: pageNum };

    const validator = new PaymentValidator();
    try {
      await validator.readPagedValidation().validate(dataFormmated, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!validator.isRangeDateValid(rest.start_date, rest.end_date)) {
      throw new ApiError(400, 'Range date incorrect');
    }

    const paymentService = new PaymentService();
    const allPaymentsPaged = await paymentService.readPaymentsPaged(dataFormmated);
    response.json(allPaymentsPaged);
  }
}

export { PaymentController };
