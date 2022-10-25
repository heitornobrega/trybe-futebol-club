import { Router } from 'express';
import CreateUserControllerFactory from '../factories/CreateUserControllerFactory';

const CreateUserController = CreateUserControllerFactory.make();
const userRouter = Router();

export default userRouter
  .post(
    '/users',
    (req, res) => CreateUserController.handle(req, res),
  );
