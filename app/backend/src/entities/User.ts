import ValidationError from '../errors/ValidationError';

export enum Role {
  author = 'author',
  admin = 'admin',
}

export class User {
  // private emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  private passwordLength = 6;
  private _email: string;
  private _password: string;
  private _role: Role;
  private _username: string;

  constructor(email: string, password: string, role: Role, username: string) {
    this.validateEmail(email);
    this.validatePassword(password);

    this._email = email;
    this._password = password;
    this._role = role;
    this._username = username;
  }

  private validateEmail(email: string) {
    const isValid = email.length > this.passwordLength;
    if (!isValid) {
      throw new ValidationError('INVALID_EMAIL');
    }
  }

  private validatePassword(password: string) {
    const isValid = password.length > this.passwordLength;
    if (!isValid) {
      throw new ValidationError('INVALID_PASSWORD');
    }
  }

  get username() { return this._username; }
  get email() { return this._email; }
  get password() { return this._password; }
  get role() { return this._role; }
}
