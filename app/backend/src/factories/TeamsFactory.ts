import TeamsController from '../controller/TeamsController';
import TeamsService from '../services/TeamsService';
import SequelizeTeamsRepository from '../repositories/SequelizeTeamsRepository';

export default class TeamsFactory {
  static make = () => {
    const repository = new SequelizeTeamsRepository();
    const service = new TeamsService(repository);
    const controller = new TeamsController(service);
    return controller;
  };
}
