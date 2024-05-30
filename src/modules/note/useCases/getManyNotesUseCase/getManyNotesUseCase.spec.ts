import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { GetManyNotesUseCase } from './getManyNotesUseCase';
import { makeNote } from '../../factories/noteFactory';
import { Note } from '../../entities/note';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getManyNotesUseCase: GetManyNotesUseCase;

describe('Get Many Notes - UseCase', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getManyNotesUseCase = new GetManyNotesUseCase(noteRepositoryInMemory);
  });

  it('should be able to get many note', async () => {
    const user = makeUser({});

    const notes = [...new Array(10)].map(() => makeNote({ userId: user.id }));

    noteRepositoryInMemory.notes = notes;

    const result = await getManyNotesUseCase.execute({
      userId: user.id,
    });

    expect(result).toEqual(notes);
  });

  it('should be able to get only user notes', async () => {
    const firstUser = makeUser({});
    const secondUser = makeUser({});

    // use spread operator in the new Array for generate 10 fake notes how undefined
    const notes = [...new Array(10)].map((_, index) => makeNote({ userId: index < 5 ? firstUser.id : secondUser.id }));

    noteRepositoryInMemory.notes = notes;

    const result = await getManyNotesUseCase.execute({
      userId: firstUser.id,
    });

    expect(result).toHaveLength(5);
  });

  it('should be able to control notes per page', async () => {
    const user = makeUser({});

    const notes = [...new Array(10)].map(() => makeNote({ userId: user.id }));

    noteRepositoryInMemory.notes = notes;

    const result = await getManyNotesUseCase.execute({
      userId: user.id,
      perPage: '8',
    });

    expect(result).toHaveLength(8);
  });

  it('should be able to control note page', async () => {
    const user = makeUser({});

    const notes = [...new Array(10)].map((_, index) =>
      makeNote({ userId: user.id, title: index < 5 ? 'page 1' : 'page 2' }),
    );

    noteRepositoryInMemory.notes = notes;

    let result: Note[];

    result = await getManyNotesUseCase.execute({
      userId: user.id,
      perPage: '5',
      page: '2',
    });

    expect(result[0].title).toEqual('page 2');

    result = await getManyNotesUseCase.execute({
      userId: user.id,
      perPage: '5',
      page: '1',
    });

    expect(result[0].title).toEqual('page 1');
  });
});
