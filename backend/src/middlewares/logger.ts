import * as winston from 'winston';
import * as expressWinston from 'express-winston';

// Создаем новый тип, объединяющий ErrorLoggerOptions и дополнительные свойства
type ExtendedErrorLoggerOptions = expressWinston.ErrorLoggerOptions &
  Partial<{
    showStack: boolean;
  }>;

// Логгер запросов
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  meta: true, // включаем метаданные
  expressFormat: true, // используем стандартный формат Express
  colorize: false,
});

// Логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  showStack: true, // показываем стек ошибок
  humanReadableUnhandledException: true,
  colorize: false,
} as ExtendedErrorLoggerOptions);

export { requestLogger, errorLogger };
