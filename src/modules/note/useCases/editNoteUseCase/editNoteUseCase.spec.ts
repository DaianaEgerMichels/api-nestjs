import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { makeNote } from '../../factories/noteFactory';
import { EditNoteUseCase } from './editNoteUseCase';

let editNoteUseCase: EditNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Delete Note - UseCase', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);
  });
  it('should be able to edit a note', async () => {
    // Can edit one note if the same userId
    const user = makeUser({});
    const note = makeNote({ userId: user.id });
    noteRepositoryInMemory.notes.push(note);

    const newTitle = 'New Title';
    const newDescription = 'New Description';

    await editNoteUseCase.execute({ title: newTitle, description: newDescription, noteId: note.id, userId: user.id });

    expect(noteRepositoryInMemory.notes[0].title).toBe(newTitle);
    expect(noteRepositoryInMemory.notes[0].description).toBe(newDescription);
  });

  it('should be able to throw error if note not found', async () => {
    expect(async () => {
      await editNoteUseCase.execute({
        title: 'New Title',
        noteId: 'xptoFakeId',
        userId: 'xptoFakeId',
      });
    }).rejects.toThrow('Note not found');
  });

  it('should be able to throw error if user is unauthorized', async () => {
    const note = makeNote({});
    noteRepositoryInMemory.notes.push(note);
    expect(async () => {
      await editNoteUseCase.execute({ title: 'New Title', noteId: note.id, userId: 'xptoFakeId' });
    }).rejects.toThrow('Unauthorized');
  });
});
