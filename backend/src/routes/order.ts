import { Router } from 'express';
import { createOrder } from '../controllers/order';

// Создаем новый экземпляр маршрутизатора
// Этот объект будет содержать все наши маршруты
const router = Router();

// Настраиваем POST-маршрут для корня ('/')
// Когда клиент отправляет POST-запрос на этот путь,
// будет вызвана функция createOrder
router.post('/', createOrder);

export default router;
