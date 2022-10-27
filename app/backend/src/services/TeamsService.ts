import SequelizeTeamsRepository from '../repositories/SequelizeTeamsRepository';

export default class TeamsService {
  constructor(
    private repository: SequelizeTeamsRepository,
  ) {}

  getAll = async () => {
    const result = await this.repository.getAll();
    return result;
  };

  getById = async (id: number) => {
    const result = await this.repository.getByPk(id);
    return result;
  };
}
