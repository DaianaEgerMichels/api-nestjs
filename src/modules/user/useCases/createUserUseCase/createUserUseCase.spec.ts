import { compare } from 'bcrypt';
import { UserRepositoryInMemory } from '../../repositories/userRepositoryInMemory';
import { CreateUserUseCase } from './createUserUseCase';
import { UserWithSameEmailException } from '../../exceptions/userWithSameEmailException';
import { makeUser } from '../../factories/userFactory';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User - UseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    expect(userRepositoryInMemory.users).toHaveLength(0);
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      name: 'Collen Hover',
      email: 'collen.hover@email.com',
      password: '123xpto',
    });

    expect(userRepositoryInMemory.users).toHaveLength(1);
    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('should be able to create a new user with password hashed', async () => {
    const passwordHash = '123xpto';

    const user = await createUserUseCase.execute({
      name: 'Collen Hover',
      email: 'collen.hover@email.com',
      password: passwordHash,
    });

    const userHasPasswordHash = await compare(passwordHash, user.password);

    expect(userHasPasswordHash).toBeTruthy();
  });

  it('should not be able to create a new user with same email', async () => {
    const user = makeUser({});
    userRepositoryInMemory.users.push(user);

    expect(async () => {
      await createUserUseCase.execute({
        name: 'Collen Hover',
        email: user.email,
        password: '123xpto',
      });
    }).rejects.toThrow(UserWithSameEmailException);
  });
});
