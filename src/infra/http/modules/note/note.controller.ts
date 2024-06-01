import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { AuthRequestModel } from '../auth/models/authRequestModel';
import { NoteViewModel } from '../user/viewModels/noteViewModel';
import { CreateNoteDto } from './dtos/createNote.dto';
import { EditNoteDto } from './dtos/editNote';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/editNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { GetManyNotesUseCase } from 'src/modules/note/useCases/getManyNotesUseCase/getManyNotesUseCase';

@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private editNoteUseCase: EditNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
    private getNoteUseCase: GetNoteUseCase,
    private getManyNotesUseCase: GetManyNotesUseCase,
  ) {}

  @Post()
  async createNote(@Request() request: AuthRequestModel, @Body() body: CreateNoteDto) {
    const { title, description } = body;

    const user = await this.createNoteUseCase.execute({
      title,
      description,
      userId: request.user.id,
    });

    return NoteViewModel.toHtpp(user);
  }

  @Put(':id')
  async updateNote(@Request() request: AuthRequestModel, @Param('id') noteId: string, @Body() body: EditNoteDto) {
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

  @Get(':id')
  async getNote(@Request() request: AuthRequestModel, @Param('id') noteId: string) {
    const user = await this.getNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });

    return NoteViewModel.toHtpp(user);
  }

  @Get()
  async getManyNote(
    @Request() request: AuthRequestModel,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const users = await this.getManyNotesUseCase.execute({
      userId: request.user.id,
      page,
      perPage,
    });

    return users.map(NoteViewModel.toHtpp);
  }
}
