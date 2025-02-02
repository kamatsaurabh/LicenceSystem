import winston from 'winston';

const logLevels = {
  levels: {
    info: 0,
    warn: 1,
    error: 2,
    debug: 3,
  },
  colors: {
    info: 'green',
    warn: 'yellow',
    error: 'red',
    debug: 'blue',
  },
};

const logger = winston.createLogger({
  levels: logLevels.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug', // Default log level
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.timestamp} [${info.level}]: ${info.message}`
        )
      ),
    }),
    new winston.transports.File({
      filename: 'logs/app.log',
      level: 'info', // Log level for file transport
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

// Adding colors for log levels
winston.addColors(logLevels.colors);

export default logger;
