// repository fake for unit tests
import { Note } from './../entities/note';
import { NoteRepository } from './note.repository';

export class NoteRepositoryInMemory implements NoteRepository {
  public notes: any[] = [];

  async create(note: Note): Promise<void> {
    this.notes.push(note);
  }
}
