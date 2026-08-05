import  { type NextFunction, type Request, type Response } from 'express';
import type { HttpError } from 'http-errors';
import { config } from '../config/config.js'
const globalErrorHandler = (
  err: HttpError,
  req: Request, 
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  // Handle unexpected errors (not http-errors instances)
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    message,
    errorStack: config.env === 'development' ? err.stack : ''
  });
}

export default globalErrorHandler