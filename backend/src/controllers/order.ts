import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Order from '../models/order';
import BadRequestError from '../errors/bad-request-error';

// Функция для создания нового заказа
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Создаем новый экземпляр заказа из данных запроса
    const newOrder = new Order(req.body);
    const { total } = newOrder;

    // Проверка на ошибки валидации
    const errors = newOrder.validateSync();

    // Если есть ошибки валидации
    if (errors) {
      return res.status(400).json({
        error: 'Ошибка валидации данных при создании заказа',
      });
    }

    // Возвращаем ответ с созданным заказом
    res.status(201).json({
      id: uuidv4(),
      total: total,
    });
  } catch (error) {
    // Проверяем, является ли ошибка экземпляром BadRequestError
    if (error instanceof BadRequestError) {
      return res.status(error.statusCode).json({
        error: 'Ошибка валидации данных при создании заказа',
      });
    }

    // Передаем любую другую ошибку в следующий middleware
    next(error);
  }
};
