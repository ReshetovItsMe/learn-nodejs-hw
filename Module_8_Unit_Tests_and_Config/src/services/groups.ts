import { GroupsController } from '../controllers';
import { IGroup } from '../models/group';

class GroupsSevice {
    groupsControl: GroupsController;

    constructor() {
        this.groupsControl = new GroupsController();
    }

    getGroups(): Promise<IGroup[]> {
        return this.groupsControl.getGroups();
    }

    getGroup(id: string): Promise<IGroup> {
        return this.groupsControl.getGroup(id);
    }

    updateGroup(group: IGroup): Promise<IGroup[]> {
        return this.groupsControl.updateGroup(group);
    }

    createGroup(group: IGroup): Promise<IGroup> {
        return this.groupsControl.addGroup(group);
    }

    deleteGroup(id: string): Promise<IGroup[]> {
        return this.groupsControl.deleteGroup(id);
    }
}

export const groupsService = new GroupsSevice();
