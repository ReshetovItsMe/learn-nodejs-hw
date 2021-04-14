import * as express from 'express';
import { usersService } from '../services';
import fieldsValidation from '../middleware/userFieldsValidation';
import { IUser } from '../models/user';
import { IUserGroup } from '../models/userGroup';

const router = express.Router();

router.get('/byId', async (req, res, next) => {
    const userId: string = req.query.id.toString();
    if (!!userId) {
        const user: void | IUser = await usersService.getUser(userId).catch(next);
        if (!!user) {
            res.json(user);
            return;
        }
        res.send(`User with id='${userId}' not found`);
        return;
    }
    res.status(400).send('Bad data. Please check your request.');
});

router.get('/', async (req, res, next) => {
    const users: void | IUser[] = await usersService.getAllUsers().catch(next);
    res.json(users);
});

router.get('/autoSuggest', async (req, res, next) => {
    if (!!req.query.loginSubstring && !!req.query.limit) {
        const loginSubstring: string = req.query.loginSubstring.toString();
        const limit: number = Number.parseInt(req.query.limit.toString(), 10);
        const users: void | IUser[] = await usersService.getAutoSuggestUsers(loginSubstring, limit).catch(next);
        res.json(users);
        return;
    }
    res.status(400).send('Bad data. Please check your request.');
});

router.post('/addUser', fieldsValidation, async (req, res, next) => {
    const user: IUser = req.body;
    const newUser: void | IUser = await usersService.createUser(user).catch(next);
    res.status(201).send(newUser);
    return;
});

router.put('/updateUser', fieldsValidation, async (req, res, next) => {
    const user: IUser = req.body;
    const users: void | IUser[] = await usersService.updateUser(user).catch(next);
    res.status(201).send(users);
    return;
});

router.post('/addUsersToGroup', async (req, res, next) => {
    const usersGroup: { userIds: string[], groupId: string } = req.body;
    const newUsersGroup: void | IUserGroup[] = await usersService.addUsersToGroup(usersGroup.userIds, usersGroup.groupId).catch(next);
    res.status(201).send(newUsersGroup);
    return;
});

router.delete('/byId', async (req, res, next) => {
    const userId: string = req.query.id.toString();
    if (!!userId) {
        const users: void | IUser[] = await usersService.deleteUser(userId).catch(next);
        res.status(201).send(users);
        return;
    }
    res.status(400).send('Bad data. Please check your request.');
    return;
});

export default router;
