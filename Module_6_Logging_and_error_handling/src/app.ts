import * as express from 'express';
import { groupsRouter, usersRouter } from './routes';
import db from './data-access';
import errorHandling from './middleware/errorHandling';
import methodsLogger from './middleware/methodsLogger';
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
        logger.error('Uncaught Exception thrown:');
        logger.error(err);
        process.exit(1);
    });


const app = express();
const port = 4001;

app.use(express.json());
app.use(methodsLogger);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use(errorHandling);


app.get('/', (req, res) => {
    res.send('Hello world');
});

init();
