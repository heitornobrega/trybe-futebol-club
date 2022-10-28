import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import IPayload from '../utils/ICustomPayload';
import Token from '../utils/Token';
import LoginService from '../services/LoginService';
import CustomError from '../utils/CustomError';

const { JWT_SECRET } = process.env;

export default class LoginController {
  constructor(private service: LoginService) { }
  async loginHandle(req: Request, res: Response, next: NextFunction) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      const error = new CustomError('All fields must be filled', 400);
      next(error);
    }
    try {
      const user = await this.service.get(email, password);
      const { id } = user;
      const token = Token.generateToken(id, role);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  validateHandle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const payload = verify(authorization as string, JWT_SECRET as Secret) as IPayload;
      const { id } = payload;
      const user = await this.service.getUserById(id);
      const role = user?.role;
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };
}
