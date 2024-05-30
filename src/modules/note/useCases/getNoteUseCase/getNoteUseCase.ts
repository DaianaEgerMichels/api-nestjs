import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NoteRepository } from '../../repositories/note.repository';

interface GetNoteRequest {
  noteId: string;
  userId: string;
}

export class GetNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}
  // get one note by id
  async execute({ noteId, userId }: GetNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (note.userId !== userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return note;
  }
}
