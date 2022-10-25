import { Router } from 'express';
import LoginFactory from '../factories/LoginFactory';

const loginRouter = Router();
const loginController = LoginFactory.make();

loginRouter
  .get(
    '/validate',
    (req, res, next) => loginController.validateHandle(req, res, next),
  );

loginRouter
  .post(
    '/',
    (req, res, next) => loginController.loginHandle(req, res, next),
  );

export default loginRouter;
