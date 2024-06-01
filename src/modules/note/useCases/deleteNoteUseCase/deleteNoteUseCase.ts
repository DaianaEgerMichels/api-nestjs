import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/note.repository';
import { NoteNotFoundException } from '../../exceptions/noteNotFoundException';
import { NoteWithoutPermissionException } from '../../exceptions/noteWithoutPermissionException';

interface DeleteNoteRequest {
  noteId: string;
  userId: string;
}

@Injectable()
export class DeleteNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ noteId, userId }: DeleteNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NoteNotFoundException();
    }

    if (note.userId !== userId) {
      throw new NoteWithoutPermissionException({ actionName: 'delete' });
    }

    await this.noteRepository.delete(noteId);
  }
}
