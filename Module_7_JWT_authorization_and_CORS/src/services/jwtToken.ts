import * as jwt from 'jsonwebtoken';
import { IUser } from '../models/user';
import { usersService } from './users';

const login = async (username: string, password: string) => {
    const user: IUser = await usersService.getUserByLoginAndPassword(username, password);
    return user ? generateAccessToken(user) : null;
};

const generateAccessToken = (user: IUser): string => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};

export { login };
