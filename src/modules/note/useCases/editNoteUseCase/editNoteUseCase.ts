import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NoteRepository } from '../../repositories/note.repository';

interface EditNoteRequest {
  title: string;
  description?: string;
  noteId: string;
  userId: string;
}
export class EditNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ title, description, noteId, userId }: EditNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (note.userId !== userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    note.title = title;
    note.description = description ?? null;
    await this.noteRepository.save(note);

    return note;
  }
}
