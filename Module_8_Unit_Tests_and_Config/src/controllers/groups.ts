import logger from '../config/logger';
import db from '../data-access';
import { IGroup } from '../models/group';

class GroupsController {
    async getGroups(): Promise<IGroup[]> {
        try {
            const groups: IGroup[] = await db.Group.findAll();
            return groups;
        } catch (e) {
            logger.error('Method GroupsController.getGroups with no arguments');
            logger.error(e);
        }
    }

    async getGroup(id: string): Promise<IGroup> {
        try {
            const group: IGroup = await db.Group.findByPk(id);
            return group;
        } catch (e) {
            logger.error(`Method GroupsController.getGroup with id=${id}`);
            logger.error(e);
        }
    }

    async updateGroup(group: IGroup): Promise<IGroup[]> {
        try {
            const updatedGroupsFromDb: [number, IGroup[]] = await db.Group.update(group, { where: { id: group.id }, returning: true });
            return updatedGroupsFromDb[1];
        } catch (e) {
            logger.error(`Method GroupsController.updateGroup with user=${JSON.stringify(group)}`);
            logger.error(e);
        }
    }

    async deleteGroup(id: string): Promise<IGroup[]> {
        try {
            await db.Group.destroy({ where: { id } });
            const groups: IGroup[] = await db.Group.findAll();
            return groups;
        } catch (e) {
            logger.error(`Method GroupsController.deleteGroup with id=${id}`);
            logger.error(e);
        }
    }

    async addGroup(group: IGroup): Promise<IGroup> {
        try {
            const newGroup: IGroup = await db.Group.create(group);
            return newGroup;
        } catch (e) {
            logger.error(`Method GroupsController.addGroup with user=${JSON.stringify(group)}`);
            logger.error(e);
        }
    }
}

export default GroupsController;
