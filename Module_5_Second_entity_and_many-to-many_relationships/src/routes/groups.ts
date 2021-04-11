import * as express from 'express';
import { groupsService } from '../services';
import fieldsValidation from '../middleware/groupFieldsValidation';
import { IGroup } from '../models/group';

const router = express.Router();

router.get('/byId', async (req, res, next) => {
    const groupId: string = req.query.id.toString();
    if (!!groupId) {
        const group: void | IGroup = await groupsService.getGroup(groupId).catch(next);
        if (!!group) {
            res.json(group);
            return;
        }
        res.send(`Group with id='${groupId}' not found`);
        return;
    }
    res.status(400).send('Bad data. Please check your request.');
});

router.get('/', async (req, res, next) => {
    const groups: void | IGroup[] = await groupsService.getGroups().catch(next);
    res.json(groups);
});

router.post('/addGroup', fieldsValidation, async (req, res, next) => {
    const group: IGroup = req.body;
    const newGroup: void | IGroup = await groupsService.createGroup(group).catch(next);
    res.status(201).send(newGroup);
    return;
});

router.put('/updateGroup', fieldsValidation, async (req, res, next) => {
    const group: IGroup = req.body;
    const groups: void | IGroup[] = await groupsService.updateGroup(group).catch(next);
    res.status(201).send(groups);
    return;
});

router.delete('/byId', async (req, res, next) => {
    const groupId: string = req.query.id.toString();
    if (!!groupId) {
        const groups: void | IGroup[] = await groupsService.deleteGroup(groupId).catch(next);
        res.status(201).send(groups);
        return;
    }
    res.status(400).send('Bad data. Please check your request.');
    return;
});

export default router;
