import { UserRepositoryInMemory } from 'src/modules/user/repositories/userRepositoryInMemory';
import { ValidateUserUseCase } from './validateUserUseCase';
import { hash } from 'bcrypt';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { UnauthorizedException } from '@nestjs/common';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Validate User - UseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to return user when credentials are valid', async () => {
    const passwordWithoutEncryption = '123456';

    const user = makeUser({
      password: await hash(passwordWithoutEncryption, 12), // passwordWithEncryption,
    });

    userRepositoryInMemory.users.push(user);

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: passwordWithoutEncryption,
    });

    expect(result).toEqual(user);
  });

  it('should be able to throw an error when credentials are invalid', async () => {
    const passwordWithoutEncryption = '123456';

    const user = makeUser({
      password: await hash(passwordWithoutEncryption, 12), // passwordWithEncryption,
    });

    userRepositoryInMemory.users.push(user);

    expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      });
    }).rejects.toThrow(UnauthorizedException);

    expect(async () => {
      await validateUserUseCase.execute({
        email: 'incorrect@email.com',
        password: passwordWithoutEncryption,
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
