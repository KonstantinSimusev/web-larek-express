import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import InternalServerError from '../errors/internal-server-error';
import ConflictError from '../errors/conflict-error';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Обработка ошибок валидации Mongoose
  if (err instanceof MongooseError.ValidationError) {
    return next(new BadRequestError(err.message));
  }

  // Обработка пользовательских ошибок
  if (err instanceof BadRequestError) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: err.message,
    });
  }

  if (err instanceof ConflictError) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: err.message,
    });
  }

  // Обработка всех остальных ошибок
  if (err instanceof InternalServerError) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: err.message,
    });
  }
};

export default errorHandler;
