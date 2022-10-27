import MatchesController from '../controller/MatchesController';
import MatchesService from '../services/MatchesService';
import SequelizeMatchesRepository from '../repositories/SequelizeMatchesRepository';

export default class MatchesFactory {
  static make = () => {
    const repository = new SequelizeMatchesRepository();
    const service = new MatchesService(repository);
    const controller = new MatchesController(service);
    return controller;
  };
}
