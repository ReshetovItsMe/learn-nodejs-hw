import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send(err.toString());
};
