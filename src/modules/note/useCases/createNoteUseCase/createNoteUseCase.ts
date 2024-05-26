import { Injectable } from '@nestjs/common';
import { Note } from './../../entities/note';
import { NoteRepository } from '../../repositories/note.repository';

interface CreateNoteRequest {
  title: string;
  description?: string;
  userId: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}
  async execute({ title, userId, description }: CreateNoteRequest) {
    // dependency inversion, the class that calls useCase that will inform the note data
    const note = new Note({
      title,
      description,
      userId,
    });

    await this.noteRepository.create(note);

    return note;
  }
}
