export interface IFinalizedMatches{
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export interface ILeaderBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

const totalPoints = (finalizedMatches: IFinalizedMatches[], name: string) => {
  const homeTeams = finalizedMatches.filter(({ teamHome: { teamName } }) => teamName === name);
  let points = 0;
  const draws = homeTeams.reduce((acc, curr) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) {
      points += 1;
    }
    if (curr.homeTeamGoals > curr.awayTeamGoals) {
      points += 3;
    }
    return points;
  }, 0);
  return draws;
};

const totalGames = (finalizedMatches: IFinalizedMatches[], name: string) =>
  finalizedMatches.filter(({ teamHome: { teamName } }) => teamName === name).length;

const totalDraws = (finalizedMatches: IFinalizedMatches[], name: string) => {
  const homeTeams = finalizedMatches.filter(({ teamHome: { teamName } }) => teamName === name);
  let draw = 0;
  const draws = homeTeams.reduce((acc, curr) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) {
      draw += 1;
    }
    return draw;
  }, 0);
  return draws;
};

const totalVictories = (finalizedMatches: IFinalizedMatches[], name: string) => {
  const homeTeams = finalizedMatches.filter(({ teamHome: { teamName } }) => teamName === name);
  let vic = 0;
  const victories = homeTeams.reduce((acc, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) {
      vic += 1;
    }
    return vic;
  }, 0);
  return victories;
};

const totalLosses = (finalizedMatches: IFinalizedMatches[], name: string) => {
  const homeTeams = finalizedMatches.filter(({ teamHome: { teamName } }) => teamName === name);
  let loss = 0;
  const losses = homeTeams.reduce((acc, curr) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) {
      loss += 1;
    }
    return loss;
  }, 0);
  return losses;
};

const goalsFavor = (finalizedMatches: IFinalizedMatches[], name: string) => {
  const homeTeams = finalizedMatches.filter(({ teamHome: { teamName } }) => teamName === name);
  const homeGoals = homeTeams.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
  return homeGoals;
};

const goalsOwn = (finalizedMatches: IFinalizedMatches[], name: string) => {
  const homeTeams = finalizedMatches.filter(({ teamHome: { teamName } }) => teamName === name);
  const awayGoals = homeTeams.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
  return awayGoals;
};

const goalsBalance = (finalizedMatches: IFinalizedMatches[], name: string) => {
  const balance = goalsFavor(finalizedMatches, name) - goalsOwn(finalizedMatches, name);
  return balance;
};

const efficiency = (finalizedMatches: IFinalizedMatches[], name: string) => {
  const points = totalPoints(finalizedMatches, name);
  const games = totalGames(finalizedMatches, name);
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

const getHomeLeaderboard = (finalizedMatches: IFinalizedMatches[]) => {
  const teams = [...new Set(finalizedMatches.map((item) => item.teamHome.teamName))];
  const homeLeaderboard = teams.map((name) => ({
    name,
    totalPoints: totalPoints(finalizedMatches, name),
    totalGames: totalGames(finalizedMatches, name),
    totalVictories: totalVictories(finalizedMatches, name),
    totalDraws: totalDraws(finalizedMatches, name),
    totalLosses: totalLosses(finalizedMatches, name),
    goalsFavor: goalsFavor(finalizedMatches, name),
    goalsOwn: goalsOwn(finalizedMatches, name),
    goalsBalance: goalsBalance(finalizedMatches, name),
    efficiency: String(efficiency(finalizedMatches, name)),
  }));
  return orderedLeaderboard(homeLeaderboard);
};
export default getHomeLeaderboard;
