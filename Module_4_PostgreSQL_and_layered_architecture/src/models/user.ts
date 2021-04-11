import { Model, DataTypes, Sequelize } from 'sequelize';
import { IUser } from '../types/user';

interface UserInstance extends Model<IUser>, IUser { }

const User = (sequelize: Sequelize) => {
    const user = sequelize.define<UserInstance>('User', {
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
    }, {
        schema: 'scm',
        tableName: 'User'
    });
    return user;
};

export default User;
