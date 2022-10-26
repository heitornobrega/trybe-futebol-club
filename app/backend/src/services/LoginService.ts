import { compare } from 'bcryptjs';
import CustomError from '../utils/CustomError';

import SequelizeLoginRepository from '../repositories/SequelizeLoginRepository';

export default class LoginService {
  constructor(
    private repository: SequelizeLoginRepository,
  ) { }

  async get(email: string, password: string) {
    const user = await this.repository.get(email);

    if (!user) { throw new CustomError('Incorrect email or password', 401); }

    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) { throw new CustomError('Incorrect email or password', 401); }

    return user;
  }

  async getUserById(id: number) {
    const user = await this.repository.getByPk(id);
    return user;
  }
}
