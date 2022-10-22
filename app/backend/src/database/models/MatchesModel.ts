import { Model, INTEGER } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Matche extends Model {
  id: number;
  username: string;
}

Matche.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Matche',
  underscored: true,
});

Matche.hasOne(Team, { foreignKey: 'homeTeam', as: 'homeTeam' });
Matche.hasOne(Team, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Matche;
