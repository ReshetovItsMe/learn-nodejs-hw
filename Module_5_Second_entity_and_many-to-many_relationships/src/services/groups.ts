import { GroupsController } from '../controllers';
import { Group } from '../models/group';

class GroupsSevice {
    groupsControl: GroupsController;

    constructor() {
        this.groupsControl = new GroupsController();
    }

    getGroups(): Promise<Group[]> {
        return this.groupsControl.getGroups();
    }

    getGroup(id: string): Promise<Group> {
        return this.groupsControl.getGroup(id);
    }

    updateGroup(group: Group): Promise<Group[]> {
        return this.groupsControl.updateGroup(group);
    }

    createGroup(group: Group): Promise<Group> {
        return this.groupsControl.addGroup(group);
    }

    deleteGroup(id: string): Promise<Group[]> {
        return this.groupsControl.deleteGroup(id);
    }

}

export const groupsService = new GroupsSevice();
