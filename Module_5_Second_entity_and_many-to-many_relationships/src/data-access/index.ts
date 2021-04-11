import { Sequelize } from 'sequelize';
import Group from '../models/group';
import User from '../models/user';
import UserGroup from '../models/userGroup';

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'postgres'
    },
);

const models = {
    User: User.init(sequelize),
    Group: Group.init(sequelize),
    UserGroup: UserGroup.init(sequelize)
};

const db = {
    sequelize,
    ...models
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

export default db;
