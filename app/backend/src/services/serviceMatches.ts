import IMatch from '../interfaces/IMatch';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

const getAll = async () => {
  const matches = await Match.findAll({
    include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });
  return matches;
  // https://stackoverflow.com/questions/42661141/findall-include-more-tables-on-sequelize-query
};

const getAllInProgress = async () => {
  const inProgress = await Match.findAll({
    where: { inProgress: false },
    include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });
  return inProgress as unknown as IMatch[];
};

const create = async (match: Match) => {
  if (match.homeTeam === match.awayTeam) return undefined;

  const teamHome = await Team.findByPk(match.homeTeam);
  const teamAway = await Team.findByPk(match.awayTeam);

  if (!teamHome || !teamAway) return 'False';

  const insertMatch = await Match.create(match);

  return insertMatch;
};

const updateMatch = async (id: number) => {
  await Match.update(
    { inProgress: 0 },
    { where: { id } },
  );
};

const updateMatchProgress = async (id: number, homeTeamGoal: number, awayTeamGoal: number) => {
  await Match.update(
    { homeTeamGoals: homeTeamGoal, awayTeamGoals: awayTeamGoal },
    { where: { id } },
  );
};

export default { getAll, create, updateMatch, updateMatchProgress, getAllInProgress };
