import { Response, Request, NextFunction } from 'express';
import logger from '../config/logger';

export default (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Method ${req.method} ${req.url} is called${Object.keys(req.params).length > 0 ?
        `, params: ${JSON.stringify(req.params)}` : ''}${Object.keys(req.body).length > 0 ?
        `, body: ${JSON.stringify(req.body)}` : ''}`);
    next();
};
