import { Router } from 'express';
import { getProducts } from '../controllers/products';

// Создаем новый экземпляр маршрутизатора
// Этот объект будет содержать все наши маршруты
const router = Router();

// Настраиваем GET-маршрут для корня ('/')
// Когда клиент отправляет GET-запрос на этот путь,
// будет вызвана функция getProducts
router.get('/', getProducts);

export default router;