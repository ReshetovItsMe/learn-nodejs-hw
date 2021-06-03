import { GroupsController } from '..';
import db from '../../data-access';
import { IGroup } from '../../models/group';

export const groupsControllerTest = () => describe('Test GroupsController', () => {
    const testGroup: IGroup = {
        id: 'test_group',
        name: 'test_group',
        permissions: ['READ']
    };
    const groupsController = new GroupsController();

    beforeAll(async () => {
        await db.sequelize.createSchema('scm', { logging: false });
        return await db.sequelize.sync();
    });

    afterAll(async () => {
        return await db.sequelize.dropSchema('scm', { logging: false });
    });

    test('Should add group to database', async () => {
        const newGroup = await groupsController.addGroup(testGroup);
        expect(newGroup).toMatchObject(testGroup);
    });

    test('Should get group by id', async () => {
        const groupFromDb = await groupsController.getGroup(testGroup.id);
        expect(groupFromDb).toMatchObject(testGroup);
    });

    test('Should update group', async () => {
        const newName = 'new_test_name';
        const newGroups = await groupsController.updateGroup({ ...testGroup, name: newName });
        const newGroupName = newGroups.find((groupFromDb) => groupFromDb.id === testGroup.id).name;
        expect(newGroupName).toEqual(newName);
    });

    test('Should get groups', async () => {
        const groupsFromDb = await groupsController.getGroups();
        expect(groupsFromDb.length).toBeGreaterThan(0);
    });

    test('Should delete group', async () => {
        const groupsFromDb = await groupsController.deleteGroup(testGroup.id);
        expect(groupsFromDb.length).toEqual(0);
    });
});
