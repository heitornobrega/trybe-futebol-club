import Team from '../database/models/TeamModel';

export default class SequelizeTeamsRepository {
  getAll = async () => {
    const result = await Team.findAll();
    return result;
  };

  getByPk = async (id: number) => {
    const result = await Team.findByPk(id);
    return result;
  };
}
