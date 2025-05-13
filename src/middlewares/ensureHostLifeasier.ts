import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../validators/Exceptions/ApiError';

export function ensureHostLifeasier(request: Request, response: Response, next: NextFunction) {
  const urlCompare =
    process.env.NODE_ENV === 'development'
      ? process.env.URL_HOST_LIFEASIER_DEV
      : process.env.URL_HOST_LIFEASIER_PROD;

  const allowedHosts = urlCompare ? urlCompare.split(',').map(host => host.trim()) : [];
  const headerRequestUrl = request.headers.origin;

  console.log('urlCompare', urlCompare);
  console.log('allowedHosts', allowedHosts);
  console.log('headerRequestUrl', headerRequestUrl);

  if (!headerRequestUrl || !allowedHosts.some(host => headerRequestUrl.includes(host))) {
    console.log('Barrado!!!');
    throw new ApiError(401, 'Host unauthorized');
  }

  request.hostLifeasierOrigin = true;
  return next();
}
