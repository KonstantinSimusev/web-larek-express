import mongoose, { Schema } from 'mongoose';
import { get } from 'lodash';

interface IOrder {
  payment: 'card' | 'online';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: Schema.Types.ObjectId[];
}

// Создаем схему заказа
const orderSchema = new Schema<IOrder>({
  items: {
    type: [Schema.Types.ObjectId],
    required: true,
    validate: {
      validator: async function (
        value: Schema.Types.ObjectId[]
      ): Promise<boolean> {
        // Проверяем, что массив не пустой
        if (!value || value.length === 0) return false;

        // Получаем все товары из базы
        const Product = mongoose.model('Product');
        const products = await Product.find({ _id: { $in: value } });

        // Проверяем, что все товары найдены
        if (products.length !== value.length) return false;

        // Проверяем, что у всех товаров есть цена
        return products.every((product) => product.price !== null);
      },
      message: 'Неверный список товаров',
    },
  },
  total: {
    type: Number,
    required: true,
    validate: {
      validator: async function (value: number): Promise<boolean> {
        // Безопасное получение значения свойства items из объекта this
        const productIds = get(this, 'items', []);

        const products = await mongoose
          .model('Product')
          .find({ _id: { $in: productIds } });

        const calculatedTotal = products.reduce(
          (sum, product) => sum + product.price,
          0
        );
        return calculatedTotal === value;
      },
      message: 'Общая сумма не соответствует сумме товаров',
    },
  },
  payment: {
    type: String,
    required: true,
    enum: ['card', 'online'],
    validate: {
      validator: function (value: string) {
        // Проверяем, что значение является строкой
        if (typeof value !== 'string') {
          return false;
        }

        // Проверяем длину строки
        if (value.length < 3 || value.length > 6) {
          return false;
        }

        // Проверяем, что значение входит в перечисление
        return ['card', 'online'].includes(value);
      },
      message: (props) =>
        `Значение ${props.value} не является допустимым способом оплаты`,
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        const emailRegex = /^[a-z0-9-_\.]+@[a-z0-9-\.]+\.\S{2,8}$/i;
        return emailRegex.test(value);
      },
      message: 'Неверный формат email',
    },
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// Создаем модель заказа
export default mongoose.model('Order', orderSchema);
