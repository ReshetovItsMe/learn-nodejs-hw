import db from '../data-access';
import { IUser } from '../models/user';
import { IUserGroup } from '../models/userGroup';

class UsersController {
    async getUsers(): Promise<IUser[]> {
        try {
            const users: IUser[] = await db.User.findAll();
            return users;
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async getUser(id: string): Promise<IUser> {
        try {
            const user: IUser = await db.User.findByPk(id);
            return user;
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async updateUser(user: IUser): Promise<IUser[]> {
        try {
            const updatedUsersFromDb: [number, IUser[]] = await db.User.update(user, { where: { id: user.id }, returning: true });
            return updatedUsersFromDb[1];
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async deleteUser(id: string): Promise<IUser[]> {
        try {
            const updatedUsersFromDb: [number, IUser[]] = await db.User.update({ isDeleted: true }, { where: { id }, returning: true });
            return updatedUsersFromDb[1];
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async addUser(user: IUser): Promise<IUser> {
        try {
            const newUser: IUser = await db.User.create(user);
            return newUser;
        } catch (e) {
            console.error(e);
            throw new Error('Database access error');
        }
    }

    async addUsersToGroup(userIds: string[], groupId: string): Promise<IUserGroup[]> {
        try {
            const newUsersGroup: IUserGroup[] = await db.UserGroup.bulkCreate(userIds.map((userId: string) => ({
                userId, groupId
            })));
            return newUsersGroup;
        } catch (e) {
            throw new Error('Database access error');
        }
    }
}

export default UsersController;
