import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { makeNote } from '../../factories/noteFactory';
import { GetNoteUseCase } from './getNoteUseCase';

let getNoteUseCase: GetNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Get One Note - UseCase', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getNoteUseCase = new GetNoteUseCase(noteRepositoryInMemory);
  });
  it('should be able to get a note', async () => {
    // Can get one note

    const user = makeUser({});
    const note = makeNote({ userId: user.id });
    noteRepositoryInMemory.notes.push(note);

    const result = await getNoteUseCase.execute({ noteId: note.id, userId: user.id });
    expect(result).toEqual(note);
  });

  it('should be able to throw error if note not found', async () => {
    expect(async () => {
      await getNoteUseCase.execute({ noteId: 'xptoFakeId', userId: 'xptoFakeId' });
    }).rejects.toThrow('Note not found');
  });

  it('should be able to throw error if user is unauthorized', async () => {
    const note = makeNote({});
    noteRepositoryInMemory.notes.push(note);
    expect(async () => {
      await getNoteUseCase.execute({ noteId: note.id, userId: 'xptoFakeId' });
    }).rejects.toThrow('No permission to get the note');
  });
});
