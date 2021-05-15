import winston, { createLogger, format, transports, config } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import moment from 'moment';
import fs from 'fs';
import 'moment-timezone';

const { combine, printf } = format;
const logDir = 'logs';

const logLevels: config.AbstractConfigSetLevels = {
  error: 0,
  warn: 1,
  info: 3,
  http: 4,
  debug: 5,
};

const logColors: config.AbstractConfigSetColors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  http: 'green',
  debug: 'blue',
};

winston.addColors(logColors);

moment.tz.setDefault('Asia/Seoul');
const timeStamp = () => moment().format('YYYY-MM-DD HH:mm:ss');

const loggingFormat = printf(({ level, message }) => {
  if (typeof message === 'object') {
    message = JSON.stringify(message, null, 2);
  }
  return `${timeStamp()} ${level} : ${message}`;
});

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new DailyRotateFile({
  level: 'http',
  filename: `${logDir}/%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxFiles: '14d',
  maxSize: '20m',
  format: combine(loggingFormat),
});

const logger = createLogger({
  levels: logLevels,
  transports: [
    new transports.Console({
      level: 'debug',
      format: combine(format.colorize(), loggingFormat),
    }),
    dailyRotateFileTransport,
  ],
});

const stream = {
  write: (message: any) => {
    logger.http(message);
  },
};

export { logger, stream };
