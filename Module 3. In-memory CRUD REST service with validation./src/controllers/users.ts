import { UsersStorage } from "../database";
import { User } from "../interfaces/user";

class UsersController {
    private usersStore: UsersStorage

    constructor() {
        this.usersStore = new UsersStorage();
    }

    public getUsers(): User[] {
        return this.usersStore.Users;
    }

    public getUser(id: string): User {
        return this.usersStore.Users.find((user: User) => user.id === id);
    }

    public updateUser(user: User): User[] {
        const users: User[] = this.usersStore.Users;
        const oldUserIndex: number = users.findIndex((oldUserFromArray: User) => oldUserFromArray.id === user.id);
        const newUser: User = user;
        users[oldUserIndex] = newUser;
        this.usersStore.Users = users;
        return this.usersStore.Users;
    }

    public deleteUser(id: string): User[] {
        const users: User[] = this.usersStore.Users;
        const oldUserIndex: number = users.findIndex((userFromArray: User) => userFromArray.id === id);
        users[oldUserIndex] = { ...users[oldUserIndex], isDeleted: true };
        this.usersStore.Users = users;
        return this.usersStore.Users;
    }

    public addUser(user: User): User[] {
        const users: User[] = this.usersStore.Users;
        users.push(user);
        this.usersStore.Users = users;
        return this.usersStore.Users;
    }
}

export default UsersController;