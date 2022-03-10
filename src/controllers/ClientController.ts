import { Request, Response } from 'express';
import { IClient } from '../dtos/IClient';
import { ClientService } from '../services/ClientService';
import { ApiError } from '../validators/Exceptions/ApiError';
import { ClientValidator } from '../validators/ClientValidator';

class ClientController {
  async create(request: Request, response: Response) {
    const { ...data }: IClient = request.body;

    const clientValidator = new ClientValidator();
    try {
      await clientValidator.createValidaton().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message || error);
    }
    if (await clientValidator.nameExist(data.name))
      throw new ApiError(400, 'Client already exists');

    const clientService = new ClientService();
    const client = await clientService.create(data);
    return response.status(201).json(client);
  }

  async read(request: Request, response: Response) {
    const clientService = new ClientService();
    const client = await clientService.read();
    return response.status(200).json(client);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const clientValidator = new ClientValidator();
    try {
      await clientValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await clientValidator.idExist(+id))) throw new ApiError(404, 'Client does not exist');

    const clientService = new ClientService();
    const client = await clientService.readById(+id);
    return response.status(200).json(client);
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const clientValidator = new ClientValidator();
    try {
      await clientValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await clientValidator.idExist(+id))) throw new ApiError(404, 'Client does not exist');

    const clientService = new ClientService();
    await clientService.deleteById(+id);
    return response.status(200).json({ message: 'Client deleted successfully' });
  }

  async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { ...data }: IClient = request.body;

    const clientValidator = new ClientValidator();
    try {
      await clientValidator
        .updateValidation()
        .validate({ id: +id, ...data }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await clientValidator.idExist(+id))) throw new ApiError(404, 'Client does not exist');

    const clientService = new ClientService();
    await clientService.updateById(+id, data);
    return response.status(200).json({ message: 'Client updated successfully' });
  }
}

export { ClientController };
