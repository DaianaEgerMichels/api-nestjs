import { NoteRepository } from '../../repositories/note.repository';

interface GetManyNotesRequest {
  userId: string;
  page?: string;
  perPage?: string;
}

export class GetManyNotesUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ userId, page, perPage }: GetManyNotesRequest) {
    const DEFAULT_PAGE = 1;
    // number of the items per page
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE;

    const notes = await this.noteRepository.findManyByUserId(userId, currentPage, currentPerPage);

    return notes;
  }
}
