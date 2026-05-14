import { Injectable } from '@nestjs/common';
import { IntegrationAdapter } from '../integration-adapter.interface';

@Injectable()
export class JiraAdapter implements IntegrationAdapter {
  name = 'jira';

  async send(payload: unknown): Promise<void> {
    void payload;
    return Promise.resolve();
  }
}
