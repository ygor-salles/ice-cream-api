import { Request, Response } from 'express';
import { IPayment } from '../dtos/IPayment';
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
    let { limit, page }: any = request.query;
    limit = parseInt(limit || 1);
    page = parseInt(page || 1);

    const validator = new PaymentValidator();
    try {
      await validator.readPagedValidation().validate({ limit, page }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }

    const paymentService = new PaymentService();
    const allPaymentsPaged = await paymentService.readPaymentsPaged(limit, page);
    response.status(200).json(allPaymentsPaged);
  }
}

export { PaymentController };
