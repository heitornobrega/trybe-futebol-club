import { Identifier } from 'sequelize/types';
import UserSequelize from '../database/models/UserModel';

export default class SequelizeLoginRepository {
  get = async (email: string) => {
    const result = await UserSequelize.findOne({
      where: { email },
    });
    return result;
  };

  getByPk = async (id: Identifier | undefined) => {
    const result = await UserSequelize.findOne({
      where: { id },
    });

    return result;
  };
}
