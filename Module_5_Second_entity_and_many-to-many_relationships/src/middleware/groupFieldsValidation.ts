import { Response, Request, NextFunction } from 'express';
import * as Joi from 'joi';
import { Group } from '../models/group';

const schema: Joi.ObjectSchema<Group> = Joi.object<Group>({
    name: Joi.string()
        .regex(/^[a-zA-Z\s]*$/)
        .min(3)
        .max(30)
        .required(),

    permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')).required(),

    id: Joi.string().required()
});

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const group: Group = req.body;
        await schema.validateAsync(group);
        return next();
    } catch (err) {
        console.error(err);
        res.status(400).send('Bad data. Please check your request.');
        return;
    }
};
