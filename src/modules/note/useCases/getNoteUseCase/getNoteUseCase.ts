import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/note.repository';
import { NoteNotFoundException } from '../../exceptions/noteNotFoundException';
import { NoteWithoutPermissionException } from '../../exceptions/noteWithoutPermissionException';

interface GetNoteRequest {
  noteId: string;
  userId: string;
}

@Injectable()
export class GetNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}
  // get one note by id
  async execute({ noteId, userId }: GetNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NoteNotFoundException();
    }

    if (note.userId !== userId) {
      throw new NoteWithoutPermissionException({ actionName: 'get' });
    }

    return note;
  }
}
