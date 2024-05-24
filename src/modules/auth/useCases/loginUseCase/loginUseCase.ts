import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user';
import { UserPayload } from '../../models/userPayload';
import { JwtService } from '@nestjs/jwt';

interface LoginRequest {
  user: User;
}

// class responsible for generate jwt token
@Injectable()
export class LoginUseCase {
  constructor(private jwtService: JwtService) {}
  async execute({ user }: LoginRequest) {
    const payload: UserPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toJSON(),
    };

    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }
}
