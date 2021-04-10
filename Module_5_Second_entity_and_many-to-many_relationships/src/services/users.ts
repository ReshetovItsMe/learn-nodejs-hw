import { UsersController } from '../controllers';
import { User } from '../models/user';

class UsersSevice {
    usersControl: UsersController;

    constructor() {
        this.usersControl = new UsersController();
    }

    getUser(id: string): Promise<User> {
        return this.usersControl.getUser(id);
    }

    getAllUsers(): Promise<User[]> {
        return this.usersControl.getUsers();
    }

    updateUser(user: User): Promise<User[]> {
        return this.usersControl.updateUser(user);
    }

    createUser(user: User): Promise<User> {
        return this.usersControl.addUser(user);
    }

    deleteUser(id: string): Promise<User[]> {
        return this.usersControl.deleteUser(id);
    }

    async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<User[]> {
        const users: User[] = (await this.usersControl.getUsers())
            .filter((user: User) => user.login.includes(loginSubstring)).sort();
        return users.slice(0, limit);
    }
}

export const usersService = new UsersSevice();
