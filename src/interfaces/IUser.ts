import { EnumRoleUser } from '../entities/User';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: EnumRoleUser;
}
