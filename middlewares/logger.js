const winston = require('winston');
const expressWinston = require('express-winston');
const logPath = 'log';

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: logPath + '/request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: logPath + '/error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};