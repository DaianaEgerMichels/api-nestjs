import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { DeleteNoteUseCase } from './deleteNoteUseCase';
import { makeNote } from '../../factories/noteFactory';

let deleteNoteUseCase: DeleteNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Delete Note - UseCase', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryInMemory);
  });
  it('should be able to delete a note', async () => {
    // Can delete one note if the same userId

    const user = makeUser({});
    const note = makeNote({ userId: user.id });
    noteRepositoryInMemory.notes.push(note);
    expect(noteRepositoryInMemory.notes).toHaveLength(1);

    await deleteNoteUseCase.execute({ noteId: note.id, userId: user.id });
    expect(noteRepositoryInMemory.notes).toHaveLength(0);
  });

  it('should be able to throw error if note not found', async () => {
    expect(async () => {
      await deleteNoteUseCase.execute({ noteId: 'xptoFakeId', userId: 'xptoFakeId' });
    }).rejects.toThrow('Note not found');
  });

  it('should be able to throw error if user is unauthorized', async () => {
    const note = makeNote({});
    noteRepositoryInMemory.notes.push(note);
    expect(async () => {
      await deleteNoteUseCase.execute({ noteId: note.id, userId: 'xptoFakeId' });
    }).rejects.toThrow('No permission to delete the note');
  });
});
