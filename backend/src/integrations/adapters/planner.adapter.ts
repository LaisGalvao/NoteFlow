import { Injectable } from '@nestjs/common';
import { IntegrationAdapter } from '../integration-adapter.interface';

@Injectable()
export class PlannerAdapter implements IntegrationAdapter {
  name = 'planner';

  async send(payload: unknown): Promise<void> {
    void payload;
    return Promise.resolve();
  }
}
