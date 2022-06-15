import Team from '../database/models/Team';
import serviceMath from './serviceMatches';
import IMatch from '../interfaces/IMatch';

const getName = (matchesHome: IMatch[]) => matchesHome[0].teamHome.teamName;

const getTotalGames = (matchesHome: IMatch[]) => matchesHome.length;

const caculaGoalsHome = (matchesHome: IMatch[]) => {
  let totalGoals = 0;

  matchesHome.forEach((match) => {
    totalGoals += match.homeTeamGoals;
  });

  return totalGoals;
};
const caculaGoalsAway = (matchesHome: IMatch[]) => {
  let totalGoals = 0;

  matchesHome.forEach((match) => {
    totalGoals += match.awayTeamGoals;
  });

  return totalGoals;
};
const getBalance = (matchesHome: IMatch[]) => {
  const balanceGoals = caculaGoalsHome(matchesHome) - caculaGoalsAway(matchesHome);
  return balanceGoals;
};
const getVictory = (matchesHome: IMatch[]) => {
  let victory = 0;
  matchesHome.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      victory += 1;
    }
  });
  return victory;
};
const getlosses = (matchesHome: IMatch[]) => {
  let losses = 0;
  matchesHome.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      losses += 1;
    }
  });
  return losses;
};
const getDraws = (matchesHome: IMatch[]) => {
  let draws = 0;
  matchesHome.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      draws += 1;
    }
  });
  return draws;
};
const getTotalPoinst = (matchesHome: IMatch[]) => {
  const victory = getVictory(matchesHome);
  const draws = getDraws(matchesHome);

  return victory * 3 + draws;
};
// P/(J*3)*100
const getEfficiency = (matchesHome: IMatch[]) => {
  const P = getTotalPoinst(matchesHome);
  const J = getTotalGames(matchesHome);
  const efficiency = (P / (J * 3)) * 100;
  return +efficiency.toFixed(2);
};
const createObject = (matchesHome: IMatch[]) => (
  {
    name: getName(matchesHome),
    totalPoints: getTotalPoinst(matchesHome),
    totalGames: getTotalGames(matchesHome),
    totalVictories: getVictory(matchesHome),
    totalDraws: getDraws(matchesHome),
    totalLosses: getlosses(matchesHome),
    goalsFavor: caculaGoalsHome(matchesHome),
    goalsOwn: caculaGoalsAway(matchesHome),
    goalsBalance: getBalance(matchesHome),
    efficiency: getEfficiency(matchesHome),
  }
);
const leaderBoard = async () => {
  const allTeams = await Team.findAll();
  const allMatches = await serviceMath.getAllInProgress();

  const teamBoarder = allTeams.map((team) => {
    const matchesHome = allMatches.filter((match) => team.id === match.homeTeam);

    // console.log(matchesHome);

    return createObject(matchesHome);
  });

  return teamBoarder;
};
const board = async () => {
  const result = await leaderBoard();
  if (!result) return undefined;

  return result.sort((a, b) =>
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
};

export default { board };
