// Импорты необходимых модулей и роутеров
import config from './config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import errorHandler from './middlewares/error-handler';
import { requestLogger, errorLogger } from './middlewares/logger';

// Деструктуризация объекта config
const { port, database } = config;

// Функция для подключения к MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(database.url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Вызов функции подключения к БД
connectToDB();

// Создание экземпляра Express приложения
const app = express();

// Настройка middleware
app.use(cors()); // Разрешает кросс-доменные запросы
app.use(express.json()); // Парсинг JSON данных из тела запроса
app.use(express.static(path.join(__dirname, 'public'))); // Статические файлы
app.use(express.urlencoded({ extended: true })); // Парсинг URL-кодированных данных

// Логирование запросов
app.use(requestLogger);

// Подключение роутеров
app.use('/product', productRouter);
app.use('/order', orderRouter);

// Обработка ошибок
app.use(errorHandler);
// app.use(errorLogger);

// Запуск сервера
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
