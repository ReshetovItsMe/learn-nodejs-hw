import * as express from 'express';
import { login } from '../services';

const router = express.Router();

router.post('/', async (req, res, next) => {
    const userLogin: string = req.body.login;
    const userPassword: string = req.body.password;
    try {
        const token: string | void = await login(userLogin, userPassword);

        if (!!token) {
            res.status(200).send({ success: true, message: token });
        } else {
            res.status(403).send({ success: false, message: 'Bad login/password combination' });
        }
    } catch (e) {
        next(e);
        return;
    }
});

export default router;
