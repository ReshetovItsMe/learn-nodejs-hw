import { UsersController } from "../controllers";
import { User } from "../interfaces/user";

class UsersSevice {
    private usersControl: UsersController;

    constructor() {
        this.usersControl = new UsersController();
    }

    public getUser(id: string): User {
        return this.usersControl.getUser(id);
    }

    public getAllUsers(): User[] {
        return this.usersControl.getUsers();
    }

    public updateUser(user: User) {
        return this.usersControl.updateUser(user);
    }

    public createUser(user: User) {
        return this.usersControl.addUser(user);
    }

    public deleteUser(id: string): User[] {
        return this.usersControl.deleteUser(id);
    }
}

export default UsersSevice;