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
      throw new ApiError(400, error.message || error);
    }

    const paymentService = new PaymentService();
    const payment = await paymentService.create(data);
    return response.status(201).json(payment);
  }

  async read(request: Request, response: Response) {
    const paymentService = new PaymentService();
    const payment = await paymentService.read();
    return response.status(200).json(payment);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const paymentValidator = new PaymentValidator();
    try {
      await paymentValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await paymentValidator.idExist(+id))) throw new ApiError(404, 'Payment does not exist');

    const paymentService = new PaymentService();
    const payment = await paymentService.readById(+id);
    return response.status(200).json(payment);
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const paymentValidator = new PaymentValidator();
    try {
      await paymentValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await paymentValidator.idExist(+id))) throw new ApiError(404, 'Payment does not exist');

    const paymentService = new PaymentService();
    await paymentService.deleteById(+id);
    return response.status(200).json({ message: 'Payment deleted successfully' });
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
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await paymentValidator.idExist(+id))) throw new ApiError(404, 'Payment does not exist');

    const paymentService = new PaymentService();
    await paymentService.updateById(+id, data);
    return response.status(200).json({ message: 'Payment updated successfully' });
  }
}

export { PaymentController };
