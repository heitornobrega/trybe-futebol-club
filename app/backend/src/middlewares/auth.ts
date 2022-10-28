import { NextFunction, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import IPayload from '../utils/ICustomPayload';
import CustomError from '../utils/CustomError';
import ICustomRequest from '../utils/ICustomRequest';

const { JWT_SECRET } = process.env;

const auth = (req:ICustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
    verify(authorization as string, JWT_SECRET as Secret);
  } catch (e) {
    const error = new CustomError('Token must be a valid token', 401);
    return next(error);
  }
  try {
    const payload = verify(authorization as string, JWT_SECRET as Secret) as IPayload;
    const { id } = payload;
    req.id = id;
    return next();
  } catch (err) {
    const error = new CustomError('Token must be a valid token', 401);
    return next(error);
  }
};

export default auth;
