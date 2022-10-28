import SequelizeMatchesRepository,
{ ICreateMatche, IUpdateMatcheGoals } from '../repositories/SequelizeMatchesRepository';

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
}
