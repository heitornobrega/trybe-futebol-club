import { Secret, sign } from 'jsonwebtoken';
import { Role } from '../entities/User';

const { JWT_SECRET } = process.env;

export default class Token {
  static generateToken = (id: number, role: Role) => {
    const payload = { id, role };
    return sign(payload, JWT_SECRET as Secret);
  };
}
