import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Team extends Model {
  id: number;
  username: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: STRING,
    allowNull: false,
  },

}, {
  sequelize: db,
  modelName: 'Team',
  underscored: true,
});

export default Team;
