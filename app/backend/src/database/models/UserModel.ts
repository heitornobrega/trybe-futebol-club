import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class UserSequelize extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  role!: string;
}

UserSequelize.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'user',
  underscored: true,
  timestamps: false,
});

export default UserSequelize;
