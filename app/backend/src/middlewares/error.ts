import { Response, Request, NextFunction } from 'express';
import CustomError from '../utils/CustomError';

const error = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  return res.status(err.statusCode).json({ message: err.message });
};

export default error;
