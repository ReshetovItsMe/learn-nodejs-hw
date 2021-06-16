import logger from '../config/logger';
import db from '../data-access';
import { IUser } from '../models/user';
import { IUserGroup } from '../models/userGroup';

class UsersController {
    async getUsers(): Promise<IUser[]> {
        try {
            const users: IUser[] = await db.User.findAll();
            return users;
        } catch (e) {
            logger.error('Method UsersController.getUsers');
            logger.error(e);
            throw e;
        }
    }

    async getUser(id: string): Promise<IUser> {
        try {
            const user: IUser = await db.User.findByPk(id);
            return user;
        } catch (e) {
            logger.error(`Method UsersController.getUser with id=${id}`);
            logger.error(e);
            throw e;
        }
    }

    async getUserByLogin(login: string): Promise<IUser> {
        try {
            const user: IUser = await db.User.findOne({
                raw: true,
                where: { login }
            });
            return user;
        } catch (e) {
            logger.error(`Method UsersController.getUserByLoginAndPassword with login=${login}`);
            logger.error(e);
            throw e;
        }
    }

    async updateUser(user: IUser): Promise<IUser[]> {
        try {
            const updatedUsersFromDb: [number, IUser[]] = await db.User.update(user, { where: { id: user.id }, returning: true });
            return updatedUsersFromDb[1];
        } catch (e) {
            logger.error(`Method UsersController.updateUser with user=${JSON.stringify(user)}`);
            logger.error(e);
            throw e;
        }
    }

    async deleteUser(id: string): Promise<IUser[]> {
        try {
            const updatedUsersFromDb: [number, IUser[]] = await db.User.update({ isDeleted: true }, { where: { id }, returning: true });
            return updatedUsersFromDb[1];
        } catch (e) {
            logger.error(`Method UsersController.deleteUser with id=${id}`);
            logger.error(e);
            throw e;
        }
    }

    async addUser(user: IUser): Promise<IUser> {
        try {
            const newUser: IUser = await db.User.create(user);
            return newUser;
        } catch (e) {
            logger.error(`Method UsersController.addUser with user=${JSON.stringify(user)}`);
            logger.error(e);
            throw e;
        }
    }

    async addUsersToGroup(userIds: string[], groupId: string): Promise<IUserGroup[]> {
        try {
            const newUsersGroup: IUserGroup[] = await db.UserGroup.bulkCreate(userIds.map((userId: string) => ({
                userId, groupId
            })));
            return newUsersGroup;
        } catch (e) {
            logger.error(`Method UsersController.addUsersToGroup with userIds=${userIds} and userIds=${groupId}`);
            logger.error(e);
            throw e;
        }
    }
}

export default UsersController;
