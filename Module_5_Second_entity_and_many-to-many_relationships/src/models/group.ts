import { Model, DataTypes } from 'sequelize';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'

export type IGroup = {
    id: string;
    name: string;
    permissions: Array<Permission>;
}

class Group extends Model<IGroup> {
    static init(sequelize) {
        return super.init.call(this,
            {
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
            },
            {
                schema: 'scm',
                tableName: 'Group',
                sequelize
            },
        );
    }

    static associate(models) {
        this.belongsToMany(models.User, {
            onDelete: 'CASCADE',
            through: models.UserGroup,
            as: 'users',
            foreignKey: 'groupId',
            otherKey: 'userId'
        });
    }
}

export default Group;
