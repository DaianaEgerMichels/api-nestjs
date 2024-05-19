import { User } from '../entities/user';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'collen.hover@email.com',
      name: 'Collen Hover',
      password: '123xpto',
      ...override,
    },
    id,
  );
};
