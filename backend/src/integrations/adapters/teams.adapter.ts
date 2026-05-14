import { Injectable } from '@nestjs/common';
import { IntegrationAdapter } from '../integration-adapter.interface';

@Injectable()
export class TeamsAdapter implements IntegrationAdapter {
  name = 'teams';

  async send(payload: unknown): Promise<void> {
    void payload;
    return Promise.resolve();
  }
}
