import { hashSync } from 'bcryptjs';

class HookUser {
  public static async hashPassword(password: string): Promise<string> {
    password = hashSync(password, 8);
    return password;
  }
}

export { HookUser };
