import * as winston from 'winston';

const { printf, combine, splat, timestamp: time, colorize } = winston.format;
const myFormat = printf(({ level, message, timestamp }) => {
    const msg = `${timestamp} [${level}] : ${message} `;
    return msg;
});

const options = {
    level: 'info',
    format: combine(
        colorize(),
        splat(),
        time(),
        myFormat
    ),
    handleExceptions: true,
    json: false
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options)
    ],
    exitOnError: false // do not exit on handled exceptions
});

export default logger;
