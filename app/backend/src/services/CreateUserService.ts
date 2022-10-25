import { Role, User } from '../entities/User';
import AdminUser from '../entities/AdminUser';
import AuthorUser from '../entities/AuthorUser';
import ValidationError from '../errors/ValidationError';

export interface CreateUserRepository{
  create(user: User): Promise<{ id: number }>
}

export class CreateUserService {
  constructor(
    private repository: CreateUserRepository,
  ) {}

  private incorrectRole = 'INCORRECT_ROLE';
  async create(email: string, password: string, role: string, username: string) {
    const user = this.getUserInstance(email, password, role, username);
    const { id } = await this.repository.create(user);
    return { id };
  }

  private getUserInstance(email: string, password: string, role: string, username: string): User {
    if (role === Role.admin) {
      return new AdminUser(email, password, username);
    }
    if (role === Role.author) {
      return new AuthorUser(email, password, username);
    }
    throw new ValidationError(this.incorrectRole);
  }
}
