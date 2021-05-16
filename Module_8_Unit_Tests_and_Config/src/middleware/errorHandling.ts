import { Response, Request } from 'express';
import logger from '../config/logger';

export default (err: any, req: Request, res: Response) => {
    logger.error(err);
    res.status(500).send(err.toString());
};
