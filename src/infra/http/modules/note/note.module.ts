import { Module } from '@nestjs/common';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { NoteController } from './note.controller';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/editNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { GetManyNotesUseCase } from 'src/modules/note/useCases/getManyNotesUseCase/getManyNotesUseCase';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  controllers: [NoteController],
  providers: [CreateNoteUseCase, EditNoteUseCase, DeleteNoteUseCase, GetNoteUseCase, GetManyNotesUseCase],
  imports: [DatabaseModule],
})
export class NoteModule {}
