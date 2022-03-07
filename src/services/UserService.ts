import { hash } from 'bcryptjs';
import { getCustomRepository, Repository } from 'typeorm';
import { IUser } from '../interfaces/IUser';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

class UserService {
  private repositoryUser: Repository<User>;

  constructor() {
    this.repositoryUser = getCustomRepository(UserRepository);
  }

  async create(data: IUser) {
    const user = this.repositoryUser.create(data);
    await this.repositoryUser.save(user);
    delete user.password;
    return user;
  }

  async read() {
    const allUsers = await this.repositoryUser.find({
      select: ['id', 'name', 'email', 'created_at', 'updated_at'],
    });
    return allUsers;
  }

  async readById(id: number) {
    const user = await this.repositoryUser.findOne(id);
    delete user.password;
    return user;
  }

  async deleteById(id: number) {
    await this.repositoryUser.delete(id);
  }

  async updateById(id: number, data: IUser) {
    if (data.password) {
      data.password = await hash(data.password, 8);
    }
    await this.repositoryUser.update(id, data);
  }
}

export { UserService };
