import { Injectable } from '@nestjs/common';
import { IntegrationAdapter } from '../integration-adapter.interface';

@Injectable()
export class ClickUpAdapter implements IntegrationAdapter {
  name = 'clickup';

  async send(payload: unknown): Promise<void> {
    void payload;
    return Promise.resolve();
  }
}
