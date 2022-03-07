import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { ApiError } from '../validators/Exceptions/ApiError';
import 'dotenv/config';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  // Receber o token
  const authToken = request.headers.authorization;
  // Validar se o authToken está preenchido
  if (!authToken) {
    throw new ApiError(401);
  }

  const [, token] = authToken.split(' ');

  try {
    // Verificar se token é válido
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    // Recuperar informações do usuário
    request.userId = sub;

    return next();
  } catch (error) {
    throw new ApiError(401);
  }
}
