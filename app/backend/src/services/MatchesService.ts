import SequelizeMatchesRepository from '../repositories/SequelizeMatchesRepository';

export default class MatchesService {
  constructor(private repository: SequelizeMatchesRepository) { }

  getAll = async () => {
    const allMatches = await this.repository.getAll();
    return allMatches;
  };
}
