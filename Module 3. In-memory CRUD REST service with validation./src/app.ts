import * as express from 'express';
import { usersRouter } from './routes';

const app = express();
const port = 4001;

app.use(express.json());
app.use('/users', usersRouter);


app.get('/', (req, res) => {
    res.send('Hello world')
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
});