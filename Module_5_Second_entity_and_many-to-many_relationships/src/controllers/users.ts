import db from '../data-access';
import { User } from '../models/user';

class UsersController {

    async getUsers(): Promise<User[]> {
        try {
            const users: User[] = await db.User.findAll();
            return users;
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async getUser(id: string): Promise<User> {
        try {
            const user: User = await db.User.findByPk(id);
            return user;
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async updateUser(user: User): Promise<User[]> {
        try {
            const updatedUsersFromDb: [number, User[]] = await db.User.update(user, { where: { id: user.id }, returning: true });
            return updatedUsersFromDb[1];
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async deleteUser(id: string): Promise<User[]> {
        try {
            const updatedUsersFromDb: [number, User[]] = await db.User.update({ isDeleted: true }, { where: { id: id }, returning: true });
            return updatedUsersFromDb[1];
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async addUser(user: User): Promise<User> {
        try {
            const newUser: User = await db.User.create(user);
            return newUser;
        } catch (e) {
            throw new Error('Database access error');
        }
    }
}

export default UsersController;
