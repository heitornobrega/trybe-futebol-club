import { BOOLEAN, Model, INTEGER } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Matche extends Model {
  id: number;
  username: string;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
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
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Matche',
  underscored: true,
  timestamps: false,
});

Matche.hasOne(Team, {
  sourceKey: 'homeTeam',
  foreignKey: 'id',
  as: 'teamHome',
});

Matche.hasOne(Team, {
  sourceKey: 'awayTeam',
  foreignKey: 'id',
  as: 'teamAway',
});

export default Matche;
