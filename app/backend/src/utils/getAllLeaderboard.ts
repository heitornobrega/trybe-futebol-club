import getHomeLeaderboard, { IFinalizedMatches, ILeaderBoard } from './getHomeLeaderboard';
import getAwayLeaderboard from './getAwayLeaderboard';

const totalPoints = (home: ILeaderBoard[], away: ILeaderBoard[], nameTeam: string) => {
  const awayTeamsPoints = away.find(({ name }) => nameTeam === name)?.totalPoints as number;
  const homeTeamsPoints = home.find(({ name }) => nameTeam === name)?.totalPoints as number;
  const totalSum = awayTeamsPoints + homeTeamsPoints;
  return totalSum;
};

const totalGames = (finalizedMatches: IFinalizedMatches[], name: string) => {
  const away = finalizedMatches.filter(({ teamAway: { teamName } }) => teamName === name).length;
  const home = finalizedMatches.filter(({ teamHome: { teamName } }) => teamName === name).length;
  const total = away + home;
  return total;
};

const totalDraws = (home: ILeaderBoard[], away: ILeaderBoard[], nameTeam: string) => {
  const awayTeamsPoints = away.find(({ name }) => nameTeam === name)?.totalDraws as number;
  const homeTeamsPoints = home.find(({ name }) => nameTeam === name)?.totalDraws as number;
  const total = awayTeamsPoints + homeTeamsPoints;
  return total;
};

const totalVictories = (home: ILeaderBoard[], away: ILeaderBoard[], nameTeam: string) => {
  const awayTeamsPoints = away.find(({ name }) => nameTeam === name)?.totalVictories as number;
  const homeTeamsPoints = home.find(({ name }) => nameTeam === name)?.totalVictories as number;
  const total = awayTeamsPoints + homeTeamsPoints;
  return total;
};

const totalLosses = (home: ILeaderBoard[], away: ILeaderBoard[], nameTeam: string) => {
  const awayTeamsPoints = away.find(({ name }) => nameTeam === name)?.totalLosses as number;
  const homeTeamsPoints = home.find(({ name }) => nameTeam === name)?.totalLosses as number;
  const total = awayTeamsPoints + homeTeamsPoints;
  return total;
};

const goalsFavor = (home: ILeaderBoard[], away: ILeaderBoard[], nameTeam: string) => {
  const awayTeamsPoints = away.find(({ name }) => nameTeam === name)?.goalsFavor as number;
  const homeTeamsPoints = home.find(({ name }) => nameTeam === name)?.goalsFavor as number;
  const total = awayTeamsPoints + homeTeamsPoints;
  return total;
};

const goalsOwn = (home: ILeaderBoard[], away: ILeaderBoard[], nameTeam: string) => {
  const awayTeamsPoints = away.find(({ name }) => nameTeam === name)?.goalsOwn as number;
  const homeTeamsPoints = home.find(({ name }) => nameTeam === name)?.goalsOwn as number;
  const total = awayTeamsPoints + homeTeamsPoints;
  return total;
};

const goalsBalance = (home: ILeaderBoard[], away: ILeaderBoard[], nameTeam: string) => {
  const awayTeamsPoints = away.find(({ name }) => nameTeam === name)?.goalsBalance as number;
  const homeTeamsPoints = home.find(({ name }) => nameTeam === name)?.goalsBalance as number;
  const total = awayTeamsPoints + homeTeamsPoints;
  return total;
};

const efficiency = (
  finalizedMatches: IFinalizedMatches[],
  home: ILeaderBoard[],
  away: ILeaderBoard[],
  nameTeam: string,
) => {
  const points = totalPoints(home, away, nameTeam);
  const games = totalGames(finalizedMatches, nameTeam);
  const balance = (points / (games * 3)) * 100;
  return balance.toFixed(2);
};

const orderedLeaderboard = (homeLeaderboard: ILeaderBoard[]) => {
  const byTotalPoints = homeLeaderboard.sort((board1, board2) => {
    if (board1.totalPoints < board2.totalPoints) return 1;
    if (board1.totalPoints > board2.totalPoints) return -1;

    if (board1.totalVictories < board2.totalVictories) return 1;
    if (board1.totalVictories > board2.totalVictories) return -1;

    if (board1.goalsBalance < board2.goalsBalance) return 1;
    if (board1.goalsBalance > board2.goalsBalance) return -1;

    if (board1.goalsFavor < board2.goalsFavor) return 1;
    if (board1.goalsFavor > board2.goalsFavor) return -1;

    if (board1.goalsOwn < board2.goalsOwn) return 1;
    if (board1.goalsOwn > board2.goalsOwn) return -1;

    return 0;
  });

  return byTotalPoints;
};

const getAllLeaderboard = (finalizedMatches: IFinalizedMatches[]) => {
  const home = getHomeLeaderboard(finalizedMatches);
  const away = getAwayLeaderboard(finalizedMatches);
  const teamsAway = [...new Set(away.map((item) => item.name))];
  const teamsHome = [...new Set(home.map((item) => item.name))];
  const allTeams = [...new Set(teamsAway.concat(teamsHome))];
  const leaderboard = allTeams.map((name) => ({
    name,
    totalPoints: totalPoints(home, away, name),
    totalGames: totalGames(finalizedMatches, name),
    totalVictories: totalVictories(home, away, name),
    totalDraws: totalDraws(home, away, name),
    totalLosses: totalLosses(home, away, name),
    goalsFavor: goalsFavor(home, away, name),
    goalsOwn: goalsOwn(home, away, name),
    goalsBalance: goalsBalance(home, away, name),
    efficiency: String(efficiency(finalizedMatches, home, away, name)),
  }));
  return orderedLeaderboard(leaderboard);
};
export default getAllLeaderboard;
