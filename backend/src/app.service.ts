import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return { service: 'NoteFlow API', status: 'ok' };
  }
}
