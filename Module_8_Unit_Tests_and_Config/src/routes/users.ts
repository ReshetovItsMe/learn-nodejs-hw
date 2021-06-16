import * as express from 'express';
import { usersService } from '../services';
import fieldsValidation from '../middleware/userFieldsValidation';
import { IUser } from '../models/user';
import { IUserGroup } from '../models/userGroup';

const router = express.Router();

router.get('/byId', async (req, res, next) => {
    const userId: string = req.query.id.toString();
    if (!!userId) {
        try {
            const user: void | IUser = await usersService.getUser(userId);
            if (!!user) {
                res.json(user);
                return;
            }
            res.send(`User with id='${userId}' not found`);
            return;
        } catch (e) {
            next(e);
            return;
        }
    }
    res.status(400).send('Bad data. Please check your request.');
});

router.get('/', async (req, res, next) => {
    try {
        const users: void | IUser[] = await usersService.getAllUsers();
        res.json(users);
    } catch (e) {
        next(e);
        return;
    }
});

router.get('/autoSuggest', async (req, res, next) => {
    if (!!req.query.loginSubstring && !!req.query.limit) {
        const loginSubstring: string = req.query.loginSubstring.toString();
        const limit: number = Number.parseInt(req.query.limit.toString(), 10);
        try {
            const users: void | IUser[] = await usersService.getAutoSuggestUsers(loginSubstring, limit);
            res.json(users);
            return;
        } catch (e) {
            next(e);
            return;
        }
    }
    res.status(400).send('Bad data. Please check your request.');
});

router.post('/addUser', fieldsValidation, async (req, res, next) => {
    const user: IUser = req.body;
    try {
        const newUser: void | IUser = await usersService.createUser(user);
        res.status(201).send(newUser);
        return;
    } catch (e) {
        next(e);
        return;
    }
});

router.put('/updateUser', fieldsValidation, async (req, res, next) => {
    const user: IUser = req.body;
    try {
        const users: void | IUser[] = await usersService.updateUser(user);
        res.status(201).send(users);
        return;
    } catch (e) {
        next(e);
        return;
    }
});

router.post('/addUsersToGroup', async (req, res, next) => {
    const usersGroup: { userIds: string[], groupId: string } = req.body;
    try {
        const newUsersGroup: void | IUserGroup[] = await usersService.addUsersToGroup(usersGroup.userIds, usersGroup.groupId);
        res.status(201).send(newUsersGroup);
        return;
    } catch (e) {
        next(e);
        return;
    }
});

router.delete('/byId', async (req, res, next) => {
    const userId: string = req.query.id.toString();
    if (!!userId) {
        try {
            const users: void | IUser[] = await usersService.deleteUser(userId);
            res.status(201).send(users);
            return;
        } catch (e) {
            next(e);
            return;
        }
    }
    res.status(400).send('Bad data. Please check your request.');
    return;
});

export default router;
