import { Model, DataTypes } from 'sequelize';

export type IUser = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}
class User extends Model<IUser> {
    static init(sequelize) {
        return super.init.call(this,
            {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: DataTypes.STRING
                },
                login: {
                    allowNull: false,
                    type: DataTypes.STRING
                },
                password: {
                    allowNull: false,
                    type: DataTypes.STRING
                },
                age: {
                    allowNull: true,
                    type: DataTypes.INTEGER
                },
                isDeleted: {
                    allowNull: true,
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                }
            },
            {
                schema: 'scm',
                tableName: 'User',
                sequelize
            },
        );
    }

    static associate(models) {
        this.belongsToMany(models.Group, {
            onDelete: 'CASCADE',
            through: models.UserGroup,
            as: 'groups',
            foreignKey: 'userId',
            otherKey: 'groupId'
        });
    }
}

export default User;
