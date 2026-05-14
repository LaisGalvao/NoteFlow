import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto implements Partial<CreateNoteDto> {
  title?: string;

  content?: string;
}
