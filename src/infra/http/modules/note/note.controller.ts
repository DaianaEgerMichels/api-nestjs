import { Body, Controller, Delete, Param, Post, Put, Request } from '@nestjs/common';
import { AuthRequestModel } from '../auth/models/authRequestModel';
import { NoteViewModel } from '../user/viewModels/noteViewModel';
import { CreateNote } from './dtos/createNote.dto';
import { EditNote } from './dtos/editNote';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/editNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';

@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private editNoteUseCase: EditNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
  ) {}

  @Post()
  async createNote(@Request() request: AuthRequestModel, @Body() body: CreateNote) {
    const { title, description } = body;

    const user = await this.createNoteUseCase.execute({
      title,
      description,
      userId: request.user.id,
    });

    return NoteViewModel.toHtpp(user);
  }

  @Put(':id')
  async updateNote(@Request() request: AuthRequestModel, @Param('id') noteId: string, @Body() body: EditNote) {
    const { title, description } = body;

    await this.editNoteUseCase.execute({
      noteId,
      userId: request.user.id,
      title,
      description,
    });
  }

  @Delete(':id')
  async deleteNote(@Request() request: AuthRequestModel, @Param('id') noteId: string) {
    await this.deleteNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });
  }
}
