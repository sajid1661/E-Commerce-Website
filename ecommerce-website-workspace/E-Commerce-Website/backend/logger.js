import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}] ${message}`),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'application.log' }),
  ],
});

export default logger;