import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { AuthRequestModel } from '../auth/models/authRequestModel';
import { NoteViewModel } from '../user/viewModels/noteViewModel';
import { CreateNote } from './dtos/createNote.dto';

@Controller('notes')
export class NoteController {
  constructor(private createNoteUseCase: CreateNoteUseCase) {}

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
}
