import { JwtService } from '@nestjs/jwt';
import { LoginUseCase } from './loginUseCase';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { UserPayload } from '../../models/userPayload';

let loginUseCase: LoginUseCase;
let jwtService: JwtService;

describe('Login - UseCase', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    loginUseCase = new LoginUseCase(jwtService);
  });

  it('should be able to create valid accesstoken', async () => {
    const user = makeUser({});

    const token = await loginUseCase.execute({ user });

    const payload = jwtService.decode(token) as UserPayload;
    expect(payload.sub).toEqual(user.id);
  });
});
