import { UsersController } from '../controllers';
import { User } from '../types/user';

class UsersSevice {
    usersControl: UsersController;

    constructor() {
        this.usersControl = new UsersController();
    }

    getUser(id: string): User {
        return this.usersControl.getUser(id);
    }

    getAllUsers(): User[] {
        return this.usersControl.getUsers();
    }

    updateUser(user: User) {
        return this.usersControl.updateUser(user);
    }

    createUser(user: User) {
        return this.usersControl.addUser(user);
    }

    deleteUser(id: string): User[] {
        return this.usersControl.deleteUser(id);
    }

    getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
        const users: User[] = this.usersControl.getUsers()
            .filter((user: User) => user.login.includes(loginSubstring)).sort();
        return users.slice(0, limit);
    }
}

export default UsersSevice;
