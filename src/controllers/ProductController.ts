import { Request, Response } from 'express';
import { IProduct } from '../dtos/IProduct';
import { ProductService } from '../services/ProductService';
import { ApiError } from '../validators/Exceptions/ApiError';
import { ProductValidator } from '../validators/ProductValidator';

class ProductController {
  async create(request: Request, response: Response) {
    const { ...data }: IProduct = request.body;

    const productValidator = new ProductValidator();
    try {
      await productValidator.createValidaton().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message || error);
    }
    if (await productValidator.nameExist(data.name))
      throw new ApiError(400, 'Product already exists');

    const productService = new ProductService();
    const product = await productService.create(data);
    return response.status(201).json(product);
  }

  async read(request: Request, response: Response) {
    const productService = new ProductService();
    const product = await productService.read();
    return response.status(200).json(product);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const productValidator = new ProductValidator();
    try {
      await productValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await productValidator.idExist(+id))) throw new ApiError(404, 'Product does not exist');

    const productService = new ProductService();
    const product = await productService.readById(+id);
    return response.status(200).json(product);
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const productValidator = new ProductValidator();
    try {
      await productValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await productValidator.idExist(+id))) throw new ApiError(404, 'Product does not exist');

    const productService = new ProductService();
    await productService.deleteById(+id);
    return response.status(200).json({ message: 'Product deleted successfully' });
  }

  async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { ...data }: IProduct = request.body;

    const productValidator = new ProductValidator();
    try {
      await productValidator
        .updateValidation()
        .validate({ id: +id, ...data }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await productValidator.idExist(+id))) throw new ApiError(404, 'Product does not exist');

    const productService = new ProductService();
    await productService.updateById(+id, data);
    return response.status(200).json({ message: 'Product updated successfully' });
  }
}

export { ProductController };
