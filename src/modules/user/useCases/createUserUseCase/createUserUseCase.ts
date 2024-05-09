// useCase -> a single action
// principle of single responsibility
// (it is common to see the use of service with all methods in a single file)

import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from '../../entities/User';
import { hash } from 'bcrypt';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({ email, name, password }: CreateUserRequest) {
    // dependency inversion, the class that calls useCase that will inform the user data
    const user = new User({
      email,
      name,
      password: await hash(password, 12),
    });

    await this.userRepository.create(user);

    return user;
  }
}
