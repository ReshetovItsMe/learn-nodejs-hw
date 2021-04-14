import { DataTypes, Model } from 'sequelize';

export type IUserGroup = {
    userId: string;
    groupId: string;
}

class UserGroup extends Model<IUserGroup> {
    static init(sequelize) {
        return super.init.call(this,
            {
                userId: {
                    allowNull: false,
                    type: DataTypes.STRING
                },
                groupId: {
                    allowNull: false,
                    type: DataTypes.STRING
                }
            },
            {
                schema: 'scm',
                tableName: 'User_Group',
                sequelize
            },
        );
    }
}

export default UserGroup;
