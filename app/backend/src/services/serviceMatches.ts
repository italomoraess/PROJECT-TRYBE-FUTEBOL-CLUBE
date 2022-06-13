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

export default { getAll };
