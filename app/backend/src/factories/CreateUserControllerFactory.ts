import CreateUserController from '../controller/CreateUserController';
import { CreateUserService } from '../services/CreateUserService';
import SequelizeCreateUserRepository from '../repositories/SequelizeCreateUserRepository';

export default class CreateUserControllerFactory {
  static make() {
    const repository = new SequelizeCreateUserRepository();
    const service = new CreateUserService(repository);
    const controller = new CreateUserController(service);
    return controller;
  }
}
