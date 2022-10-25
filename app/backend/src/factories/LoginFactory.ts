import LoginController from '../controller/LoginController';
import LoginService from '../services/LoginService';
import SequelizeLoginRepository from '../repositories/SequelizeLoginRepository';

export default class LoginFactory {
  static make = () => {
    const repository = new SequelizeLoginRepository();
    const service = new LoginService(repository);
    const controller = new LoginController(service);
    return controller;
  };
}
