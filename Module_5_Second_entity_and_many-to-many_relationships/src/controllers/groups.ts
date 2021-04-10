import db from '../data-access';
import { Group } from '../models/group';

class GroupsController {

    async getGroups(): Promise<Group[]> {
        try {
            const groups: Group[] = await db.Group.findAll();
            return groups;
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async getGroup(id: string): Promise<Group> {
        try {
            const group: Group = await db.Group.findByPk(id);
            return group;
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async updateGroup(user: Group): Promise<Group[]> {
        try {
            const updatedGroupsFromDb: [number, Group[]] = await db.Group.update(user, { where: { id: user.id }, returning: true });
            return updatedGroupsFromDb[1];
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async deleteGroup(id: string): Promise<Group[]> {
        try {
            await db.Group.destroy({ where: { id: id } });
            const groups: Group[] = await db.Group.findAll();
            return groups;
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async addGroup(user: Group): Promise<Group> {
        try {
            const newGroup: Group = await db.Group.create(user);
            return newGroup;
        } catch (e) {
            throw new Error('Database access error');
        }
    }
}

export default GroupsController;
