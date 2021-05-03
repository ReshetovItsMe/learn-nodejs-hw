import { createHashedPassword, checkPassword } from '.';
import { UsersController } from '../controllers';
import { IUser } from '../models/user';
import { IUserGroup } from '../models/userGroup';

class UsersSevice {
    usersControl: UsersController;

    constructor() {
        this.usersControl = new UsersController();
    }

    getUser(id: string): Promise<IUser | undefined> {
        return this.usersControl.getUser(id);
    }

    async getUserByLoginAndPassword(login: string, password: string): Promise<IUser | undefined> {
        const user: IUser | undefined = await this.usersControl.getUserByLogin(login);
        const isPasswordsMatched: boolean = await checkPassword(password, user.password);
        return isPasswordsMatched ?
            user : null;
    }

    getAllUsers(): Promise<IUser[]> {
        return this.usersControl.getUsers();
    }

    async updateUser(user: IUser): Promise<IUser[]> {
        const hashedPassword = await createHashedPassword(user.password);
        return this.usersControl.updateUser({
            ...user,
            password: hashedPassword
        });
    }

    async createUser(user: IUser): Promise<IUser> {
        const hashedPassword = await createHashedPassword(user.password);
        return this.usersControl.addUser({
            ...user,
            password: hashedPassword
        });
    }

    deleteUser(id: string): Promise<IUser[]> {
        return this.usersControl.deleteUser(id);
    }

    addUsersToGroup(userIds: string[], groupId: string): Promise<IUserGroup[]> {
        return this.usersControl.addUsersToGroup(userIds, groupId);
    }

    async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<IUser[]> {
        const users: IUser[] = (await this.usersControl.getUsers())
            .filter((user: IUser) => user.login.includes(loginSubstring)).sort();
        return users.slice(0, limit);
    }
}

export const usersService = new UsersSevice();
