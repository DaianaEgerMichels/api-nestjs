import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { CreateNoteUseCase } from './createNoteUseCase';

let createNoteUseCase: CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Create Note - UseCase', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('should be able to create a new note', async () => {
    expect(noteRepositoryInMemory.notes).toHaveLength(0);
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const note = await createNoteUseCase.execute({
      title: 'To Do',
      description: 'This is my first note',
      userId: '123xpto',
    });

    expect(noteRepositoryInMemory.notes).toHaveLength(1);
    expect(noteRepositoryInMemory.notes).toEqual([note]);
  });
});
