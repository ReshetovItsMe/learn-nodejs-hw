import { User } from '../types/user';

class UsersStorage {
    users: User[];

    constructor() {
        this.users = [];
    }


    get Users(): User[] {
        return this.users;
    }

    set Users(users: User[]) {
        this.users = users;
    }
}

export default UsersStorage;
