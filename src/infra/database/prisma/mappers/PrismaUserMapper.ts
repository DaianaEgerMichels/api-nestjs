import { User } from 'src/modules/user/entities/user';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma({ id, name, email, password, createdAt }: User): UserRaw {
    return {
      id,
      name,
      email,
      password,
      createdAt,
    };
  }

  static toDomain({ id, email, name, password, createdAt }: UserRaw): User {
    return new User({ email, name, password, createdAt }, id);
  }
}
