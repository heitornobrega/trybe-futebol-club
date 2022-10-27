import Team from '../database/models/TeamModel';
import Matche from '../database/models/MatchesModel';

export default class SequelizeMatchesRepository {
  getAll = async () => {
    const result = Matche.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return result;
  };
}
