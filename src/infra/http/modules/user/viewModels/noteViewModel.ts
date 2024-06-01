import { Note } from '../../../../../modules/note/entities/note';
export class NoteViewModel {
  // static method to don't need instanciate the class
  static toHtpp({ id, title, description, createdAt }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
    };
  }
}
