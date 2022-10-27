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
  teamName: {
    type: STRING,
    allowNull: false,
  },

}, {
  sequelize: db,
  modelName: 'Team',
  underscored: true,
  timestamps: false,
});

export default Team;
