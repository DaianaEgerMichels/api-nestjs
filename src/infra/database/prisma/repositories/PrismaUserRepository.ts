import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { PrismaService } from '../prisma.service';
import { User } from 'src/modules/user/entities/user';
import { PrismaUserMapper } from '../mappers/prismaUserMapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: userRaw,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user ? PrismaUserMapper.toDomain(user) : null;
  }
}
