import { Request, Response } from 'express';
import { IUser } from '../dtos/IUser';
import { UserService } from '../services/UserService';
import { ApiError } from '../validators/Exceptions/ApiError';
import { UserValidator } from '../validators/UserValidator';

class UserController {
  async create(request: Request, response: Response) {
    const { ...data }: IUser = request.body;

    const userValidator = new UserValidator();
    try {
      await userValidator.createValidaton().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }

    if (await userValidator.emailExist(data.email)) {
      throw new ApiError(400, 'User already exists');
    }

    const userService = new UserService();
    const user = await userService.create(data);
    response.status(201).json(user);
  }

  async read(request: Request, response: Response) {
    const userService = new UserService();
    const user = await userService.read();
    response.status(200).json(user);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const userValidator = new UserValidator();
    try {
      await userValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await userValidator.idExist(+id))) throw new ApiError(400, 'User does not exist');

    const userService = new UserService();
    const user = await userService.readById(+id);
    response.status(200).json(user);
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const userValidator = new UserValidator();
    try {
      await userValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await userValidator.idExist(+id))) throw new ApiError(400, 'User does not exist');

    const userService = new UserService();
    await userService.deleteById(+id);
    response.status(200).json({ message: 'User deleted successfully' });
  }

  async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { ...data }: IUser = request.body;

    const userValidator = new UserValidator();
    try {
      await userValidator.updateValidation().validate({ id: +id, ...data }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error?.errors?.join(', ') || error);
    }
    if (!(await userValidator.idExist(+id))) throw new ApiError(400, 'User does not exist');

    const userService = new UserService();
    await userService.updateById(+id, data);
    response.status(200).json({ message: 'User updated successfully' });
  }
}

export { UserController };
