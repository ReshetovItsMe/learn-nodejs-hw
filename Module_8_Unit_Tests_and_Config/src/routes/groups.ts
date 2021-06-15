import * as express from 'express';
import { groupsService } from '../services';
import fieldsValidation from '../middleware/groupFieldsValidation';
import { IGroup } from '../models/group';

const router = express.Router();

router.get('/byId', async (req, res, next) => {
    const groupId: string = req.query.id.toString();
    if (!!groupId) {
        try {
            const group: void | IGroup = await groupsService.getGroup(groupId);
            if (!!group) {
                res.json(group);
                return;
            }
            res.send(`Group with id='${groupId}' not found`);
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
        const groups: void | IGroup[] = await groupsService.getGroups();
        res.json(groups);
    } catch (e) {
        next(e);
        return;
    }
});

router.post('/addGroup', fieldsValidation, async (req, res, next) => {
    const group: IGroup = req.body;
    try {
        const newGroup: void | IGroup = await groupsService.createGroup(group);
        res.status(201).send(newGroup);
        return;
    } catch (e) {
        next(e);
        return;
    }
});

router.put('/updateGroup', fieldsValidation, async (req, res, next) => {
    try {
        const group: IGroup = req.body;
        const groups: void | IGroup[] = await groupsService.updateGroup(group);
        res.status(201).send(groups);
        return;
    } catch (e) {
        next(e);
        return;
    }
});

router.delete('/byId', async (req, res, next) => {
    const groupId: string = req.query.id.toString();
    if (!!groupId) {
        try {
            const groups: void | IGroup[] = await groupsService.deleteGroup(groupId);
            res.status(201).send(groups);
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
