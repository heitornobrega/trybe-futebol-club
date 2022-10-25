import { User } from '../entities/User';
import { CreateUserRepository } from '../services/CreateUserService';
import UserSequelize from '../database/models/UserModel';

export default class SequelizeCreateUserRepository implements CreateUserRepository {
  create = async (user: User): Promise<{ id: number; }> => {
    const created = await UserSequelize.create({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    return { id: created.id };
  };
}
