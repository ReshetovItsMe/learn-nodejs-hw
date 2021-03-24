import * as express from 'express';
import { User } from '../types/user';
import { UsersSevice } from '../services';
import fieldsValidation from '../middleware/fieldsValidation';

const router = express.Router();
const userService = new UsersSevice();

router.get('/byId', (req, res) => {
    const userId: string = req.query.id.toString();
    if (!!userId) {
        const user: User = userService.getUser(userId);
        if (!!user) {
            res.json(user);
        } else {
            res.send(`User with id='${userId}' not found`);
        }
    }
    res.status(400).send('Bad data. Please check your request.');
});

router.get('/', (req, res) => {
    const users: User[] = userService.getAllUsers();
    res.json(users);
});

router.get('/autoSuggest', (req, res) => {
    if (!!req.query.loginSubstring && !!req.query.limit) {
        const loginSubstring: string = req.query.loginSubstring.toString();
        const limit: number = Number.parseInt(req.query.limit.toString(), 10);
        const users: User[] = userService.getAutoSuggestUsers(loginSubstring, limit);
        res.json(users);
    } else {
        res.status(400).send('Bad data. Please check your request.');
    }
});

router.post('/addUser', fieldsValidation, (req, res) => {
    const user: User = req.body;
    const users: User[] = userService.createUser(user);
    res.status(201).send(users);
});

router.put('/updateUser', fieldsValidation, (req, res) => {
    const user: User = req.body;
    const users: User[] = userService.updateUser(user);
    res.status(201).send(users);
});

router.delete('/byId', (req, res) => {
    const userId: string = req.query.id.toString();
    if (!!userId) {
        const users: User[] = userService.deleteUser(userId);
        res.status(201).send(users);
    } else {
        res.status(400).send('Bad data. Please check your request.');
    }
});

export default router;
