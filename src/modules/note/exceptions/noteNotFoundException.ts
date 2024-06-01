import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/app.exception';

export class NoteNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Note not found',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
