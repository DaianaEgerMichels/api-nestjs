import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prismaUserRepository';
import { NoteRepository } from 'src/modules/note/repositories/note.repository';
import { PrismaNoteRepository } from './prisma/repositories/prismaNoteRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: NoteRepository, // when call this
      useClass: PrismaNoteRepository, // injectable this
    },
  ],
  exports: [UserRepository, NoteRepository],
})
export class DatabaseModule {}
