import getAwayLeaderboard from '../utils/getAwayLeaderboard';
import SequelizeMatchesRepository,
{ ICreateMatche, IUpdateMatcheGoals } from '../repositories/SequelizeMatchesRepository';
import getHomeLeaderboard, { IFinalizedMatches } from '../utils/getHomeLeaderboard';
import getAllLeaderboard from '../utils/getAllLeaderboard';

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

  createStartedGame = async (body: ICreateMatche) => {
    const startedGame = await this.repository.createStartedGame(body);
    return startedGame;
  };

  endGame = async (id: number) => {
    await this.repository.endGame(id);
    return { message: 'Finished' };
  };

  updateTeamsGoals = async (body: IUpdateMatcheGoals) => {
    const result = await this.repository.updateTeamsGoals(body);
    return result;
  };

  getFinalizedHomeMatches = async () => {
    const result = await this.repository.getAllFinished();
    const inHome = getHomeLeaderboard(result as unknown as IFinalizedMatches[]);
    return inHome;
  };

  getFinalizedAwayMatches = async () => {
    const result = await this.repository.getAllFinished();
    const away = getAwayLeaderboard(result as unknown as IFinalizedMatches[]);
    return away;
  };

  getFinalizedAllMatches = async () => {
    const result = await this.repository.getAllFinished();
    const all = getAllLeaderboard(result as unknown as IFinalizedMatches[]);
    return all;
  };
}
