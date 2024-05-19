import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRepository } from 'src/modules/user/repositories/user.repository';

interface ValidateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  // for validate if email exists
  constructor(private userRepository: UserRepository) {}

  // one mode of check up user:
  // async execute({ email, password }: ValidateUserRequest) {
  //   const user = await this.userRepository.findByEmail(email);

  //   if (!user) throw new UnauthorizedException('Email or password incorrect');

  //   const isPassordMatched = await compare(password, user.password);

  //   if (!isPassordMatched) throw new UnauthorizedException('Email or password incorrect');
  // }

  // other mode, more clean
  async execute({ email, password }: ValidateUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      const isPassordMatched = await compare(password, user.password);
      if (isPassordMatched) return user;
    }

    throw new UnauthorizedException('Email or password incorrect');
  }
}
