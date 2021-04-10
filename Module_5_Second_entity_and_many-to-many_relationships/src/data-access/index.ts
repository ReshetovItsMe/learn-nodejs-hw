import { Sequelize } from 'sequelize';
import Group from '../models/group';
import User from '../models/user';

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'postgres',
    },
);

const db = {
    sequelize,
    User: User(sequelize),
    Group: Group(sequelize)
};

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

export default db;