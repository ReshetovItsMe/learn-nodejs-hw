import { User } from "../interfaces/user";

class UsersStorage {
    private users: User[];

    constructor() {
        this.users = [];
    }


    public get Users(): User[] {
        return this.users
    }

    public set Users(users: User[]) {
        this.users = users;
    }

}

export default UsersStorage;