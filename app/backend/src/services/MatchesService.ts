import SequelizeMatchesRepository from '../repositories/SequelizeMatchesRepository';

export default class MatchesService {
  constructor(private repository: SequelizeMatchesRepository) { }

  getAll = async () => {
    const allMatches = await this.repository.getAll();
    return allMatches;
  };

  getAllInProgress = async () => {
    const inProgressMatches = await this.repository.getInProgressMatch();
    return inProgressMatches;
  };

  getAllFinished = async () => {
    const inProgressMatches = await this.repository.getAllFinished();
    return inProgressMatches;
  };
}
