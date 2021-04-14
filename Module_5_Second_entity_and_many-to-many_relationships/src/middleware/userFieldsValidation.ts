import { Response, Request, NextFunction } from 'express';
import * as Joi from 'joi';
import { IUser } from '../models/user';

const schema: Joi.ObjectSchema<IUser> = Joi.object<IUser>({
    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$')).required(),

    id: Joi.string().required(),

    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),

    isDeleted: Joi.boolean().required()
});

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: IUser = req.body;
        await schema.validateAsync(user);
        return next();
    } catch (err) {
        console.error(err);
        res.status(400).send('Bad data. Please check your request.');
        return;
    }
};
