import Team from '../database/models/TeamModel';
import Matche from '../database/models/MatchesModel';

export interface ICreateMatche{
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface ICreateMatcheResponse extends ICreateMatche{
  id: number;
  inProgress?: boolean
}

export default class SequelizeMatchesRepository {
  getAll = async () => {
    const result = Matche.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return result;
  };

  getInProgressMatch = async () => {
    const result = await Matche.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
      where: { inProgress: true },
    });
    return result;
  };

  getAllFinished = async () => {
    const result = await Matche.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
      where: { inProgress: false },
    });
    return result;
  };

  createStartedGame = async (body: ICreateMatche) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;
    const startedGame = await Matche
      .create({
        homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
      }) as unknown as ICreateMatcheResponse;
    return startedGame;
  };
}
