import { GroupsController, UsersController } from '..';
import db from '../../data-access';
import { IGroup } from '../../models/group';
import { IUser } from '../../models/user';

export const usersControllerTest = () => describe('Test UsersController', () => {
    const testUser: IUser = {
        id: 'test',
        login: 'test',
        password: 'test',
        age: 20,
        isDeleted: false
    };
    const testGroup: IGroup = {
        id: 'test_group',
        name: 'test_group',
        permissions: ['READ']
    };
    const usersControl = new UsersController();
    const groupsController = new GroupsController();

    beforeAll(async () => {
        await db.sequelize.createSchema('scm', { logging: false });
        return await db.sequelize.sync();
    });

    afterAll(async () => {
        return await db.sequelize.dropSchema('scm', { logging: false });
    });

    test('Schema should be created', async () => {
        const numberOfSchemas: number = (await db.sequelize.showAllSchemas({ logging: false })).length;
        expect(numberOfSchemas).toEqual(1);
    });

    test('Should add user to database', async () => {
        const newUser = await usersControl.addUser(testUser);
        expect(newUser).toMatchObject(testUser);
    });

    test('Should get users from database', async () => {
        const users = await usersControl.getUsers();
        expect(users.length).toBeGreaterThan(0);
    });

    test('Should get user by id', async () => {
        const userFromDb = await usersControl.getUser(testUser.id);
        expect(userFromDb).toMatchObject(testUser);
    });

    test('Should get user by login', async () => {
        const userFromDb = await usersControl.getUserByLogin(testUser.login);
        expect(userFromDb).toMatchObject(testUser);
    });

    test('Should add user to group', async () => {
        const newGroup = await groupsController.addGroup(testGroup);
        const userGroup = await usersControl.addUsersToGroup([testUser.id], newGroup.id);
        const newUserGroupId: string = userGroup.find((newUserGroup) => newUserGroup.userId === testUser.id).groupId;
        expect(newUserGroupId).toEqual(newGroup.id);
    });

    test('Should update user', async () => {
        const newLogin: string = 'new user';
        const updatedUsers = await usersControl.updateUser({ ...testUser, login: newLogin });
        const newUserLogin: string = updatedUsers.find((dbUser) => dbUser.id === testUser.id).login;
        expect(newUserLogin).toEqual(newLogin);
    });

    test('Should soft delete user', async () => {
        const usersFromDb = await usersControl.deleteUser(testUser.id);
        const deletedUser = usersFromDb.find((dbUser) => dbUser.id === testUser.id);
        expect(deletedUser.isDeleted).toEqual(true);
    });

    test('Should throw error if delete non-existent user', async () => {
        const usersFromDb = await usersControl.deleteUser('test-non-existent');
        console.log('test log');
        console.log(usersFromDb);
        const deletedUser = usersFromDb.find((dbUser) => dbUser.id === testUser.id);
        expect(deletedUser.isDeleted).toEqual(true);
    });
});
