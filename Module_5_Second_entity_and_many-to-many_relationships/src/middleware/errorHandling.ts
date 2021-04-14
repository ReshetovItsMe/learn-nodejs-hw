import { Response, Request } from 'express';

export default (err: any, req: Request, res: Response) => {
    console.error(err);
    res.status(500).send(err.toString());
};
