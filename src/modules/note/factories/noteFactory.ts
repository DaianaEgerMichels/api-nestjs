import { Note } from '../entities/note';

// make optional properties
type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override) => {
  return new Note(
    {
      title: 'My note',
      userId: '123xpto',
      description: 'My note description',
      ...override,
    },
    id,
  );
};
