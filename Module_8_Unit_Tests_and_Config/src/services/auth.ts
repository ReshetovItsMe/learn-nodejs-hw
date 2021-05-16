import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { IUser } from '../models/user';
import { usersService } from './users';

const login = async (username: string, password: string) => {
    const user: IUser | null = await usersService.getUserByLoginAndPassword(username, password);
    return user ? generateAccessToken(user) : null;
};

const generateAccessToken = (user: IUser): string => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};

const checkPassword = (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

const createHashedPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

export { login, checkPassword, createHashedPassword };
