import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class User extends Model {
  id: number;
  username: string;
}

User.init({
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
}, {
  sequelize: db,
  modelName: 'user',
  underscored: true,
});

export default User;
