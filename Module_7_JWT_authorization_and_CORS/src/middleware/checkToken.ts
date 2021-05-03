import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { VerifyErrors } from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token.toString(), process.env.TOKEN_SECRET, (
            error: VerifyErrors | null) => {
            if (error) {
                res.status(403).send({ success: false, message: 'Failed to authenticate' });
            } else {
                return next();
            }
        });
    } else {
        res.status(401).send({ success: false, message: 'No token provided' });
    }
};
