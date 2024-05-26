import { Note } from './../entities/note';
export abstract class NoteRepository {
  abstract create(note: Note): Promise<void>;
}
