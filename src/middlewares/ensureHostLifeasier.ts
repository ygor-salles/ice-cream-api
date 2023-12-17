import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../validators/Exceptions/ApiError';

export function ensureHostLifeasier(request: Request, response: Response, next: NextFunction) {
  const urlCompare =
    process.env.NODE_ENV === 'development'
      ? process.env.URL_HOST_LIFEASIER_DEV
      : process.env.URL_HOST_LIFEASIER_PROD;
  const headerRequestUrl = request.headers.origin;

  if (!headerRequestUrl.includes(urlCompare)) {
    throw new ApiError(400);
  }

  return next();
}
