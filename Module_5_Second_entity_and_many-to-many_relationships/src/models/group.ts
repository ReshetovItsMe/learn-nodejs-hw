import { Model, DataTypes, Sequelize } from 'sequelize';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'

export type Group = {
    id: string;
    name: string;
    permissions: Array<Permission>;
}

interface GroupInstance extends Model<Group>, Group { }

const Group = (sequelize: Sequelize) => {
    const user = sequelize.define<GroupInstance>("Group", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        permissions: {
            allowNull: false,
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    }, {
        schema: 'scm',
        tableName: 'Group'
    });
    return user;
}

export default Group;
