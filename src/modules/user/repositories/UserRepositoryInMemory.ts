// repository fake for unit tests

import { User } from '../entities/user';
import { UserRepository } from './user.repository';

export class UserRepositoryInMemory implements UserRepository {
  public users: any[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
