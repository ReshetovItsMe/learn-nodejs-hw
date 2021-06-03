import { groupsControllerTest } from './groups.spec';
import { usersControllerTest } from './users.spec';

describe('Sequentially run tests', () => {
    usersControllerTest();
    groupsControllerTest();
});
