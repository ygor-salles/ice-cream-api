import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { AuthValidator } from '../validators/AuthValidator';

class AuthController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authValidator = new AuthValidator();
    try {
      await authValidator.authValidation().validate(request.body, { abortEarly: false });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }

    const authenticateUserService = new AuthService();
    const token = await authenticateUserService.execute({
      email,
      password,
    });

    if (token.status === 400) {
      response.status(400).json({ message: token.message });
    }
    response.json(token);
  }
}

export { AuthController };
