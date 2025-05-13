import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import InternalServerError from '../errors/internal-server-error';

// Функция для получения товаров
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Поиск всех товаров в базе данных
    const products = await Product.find();

    // Отправка ответа с общим количеством и списком товаров
    res.status(200).json({
      total: products.length,
      items: products,
    });
  } catch (error) {
    // Проверяем, является ли ошибка экземпляром InternalServerError
    if (error instanceof InternalServerError) {
      return res.status(error.statusCode).json({
        error: 'Ошибка валидации данных при создании товара',
      });
    }

    // Передаем любую другую ошибку в следующий middleware
    next(error);
  }
};
