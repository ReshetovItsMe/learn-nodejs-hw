import db from '../data-access';
import { IGroup } from '../models/group';

class GroupsController {
    async getGroups(): Promise<IGroup[]> {
        try {
            const groups: IGroup[] = await db.Group.findAll();
            return groups;
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async getGroup(id: string): Promise<IGroup> {
        try {
            const group: IGroup = await db.Group.findByPk(id);
            return group;
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async updateGroup(user: IGroup): Promise<IGroup[]> {
        try {
            const updatedGroupsFromDb: [number, IGroup[]] = await db.Group.update(user, { where: { id: user.id }, returning: true });
            return updatedGroupsFromDb[1];
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async deleteGroup(id: string): Promise<IGroup[]> {
        try {
            await db.Group.destroy({ where: { id } });
            const groups: IGroup[] = await db.Group.findAll();
            return groups;
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async addGroup(user: IGroup): Promise<IGroup> {
        try {
            const newGroup: IGroup = await db.Group.create(user);
            return newGroup;
        } catch (e) {
            throw new Error('Database access error');
        }
    }
}

export default GroupsController;
