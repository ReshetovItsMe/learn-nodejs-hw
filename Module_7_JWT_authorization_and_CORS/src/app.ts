import * as express from 'express';
import * as responseTime from 'response-time';
import * as cors from 'cors';
import { groupsRouter, usersRouter, loginRouter } from './routes';
import db from './data-access';
import errorHandling from './middleware/errorHandling';
import methodsLogger from './middleware/methodsLogger';
import checkToken from './middleware/checkToken';
import logger from './config/logger';

const assertDatabaseConnectionOk = async () => {
    console.log('Checking database connection...');
    try {
        await db.sequelize.sync();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
};

const init = async () => {
    await assertDatabaseConnectionOk();
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);
    });
};

process
    .on('unhandledRejection', (reason) => {
        logger.error('Unhandled Rejection at Promise:');
        logger.error(reason);
    })
    .on('uncaughtException', (err: Error) => {
        db.sequelize.close();
        logger.error('Uncaught Exception thrown:');
        logger.error(err);
        process.exit(1);
    });


const app = express();
const port = 4001;

app.use(responseTime((req, res, time) => {
    logger.info(`Method ${req.method} ${req.url} is finished in ${time}ms`);
}));
app.use(express.json());

app.use(cors());
app.use('/login', loginRouter);
app.use(methodsLogger);
app.use(checkToken);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.use(errorHandling);

init();
