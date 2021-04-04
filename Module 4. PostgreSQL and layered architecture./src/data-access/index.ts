import { Sequelize } from 'sequelize';
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
    User: User(sequelize)
};

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

export default db;