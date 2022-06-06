import { Model, DataTypes } from 'sequelize';
import db from '.';

class Team extends Model {
  teamName: string;
}

Team.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
  tableName: 'teams',
});

export default Team;