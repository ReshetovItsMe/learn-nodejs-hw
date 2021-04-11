import { UsersController } from '../controllers';
import { IUser } from '../models/user';
import { IUserGroup } from '../models/userGroup';

class UsersSevice {
    usersControl: UsersController;

    constructor() {
        this.usersControl = new UsersController();
    }

    getUser(id: string): Promise<IUser> {
        return this.usersControl.getUser(id);
    }

    getAllUsers(): Promise<IUser[]> {
        return this.usersControl.getUsers();
    }

    updateUser(user: IUser): Promise<IUser[]> {
        return this.usersControl.updateUser(user);
    }

    createUser(user: IUser): Promise<IUser> {
        return this.usersControl.addUser(user);
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
