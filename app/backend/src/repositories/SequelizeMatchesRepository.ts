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

export interface IUpdateMatcheGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
  id: number;
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

  endGame = async (id: number) => {
    const finished = await Matche.update({ inProgress: false }, { where: { id } });
    return finished;
  };

  updateTeamsGoals = async (body: IUpdateMatcheGoals) => {
    const { homeTeamGoals, awayTeamGoals, id } = body;
    const result = await Matche.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return result;
  };
}
