// repository fake for unit tests
import { Note } from './../entities/note';
import { NoteRepository } from './note.repository';

export class NoteRepositoryInMemory implements NoteRepository {
  public notes: any[] = [];

  async create(note: Note): Promise<void> {
    this.notes.push(note);
  }

  async findById(id: string): Promise<Note | null> {
    const note = this.notes.find((note) => note.id === id);
    if (!note) return null;
    return note;
  }
  async delete(id: string): Promise<void> {
    this.notes = this.notes.filter((note) => note.id !== id);
  }

  async save(note: Note): Promise<void> {
    const index = this.notes.findIndex((item) => item.id === note.id);
    if (index >= 0) this.notes[index] = note;
  }
}
