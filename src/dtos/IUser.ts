import { EnumRoleUser } from '../entities/User';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: EnumRoleUser;
  created_at?: Date;
  updated_at?: Date;
}
