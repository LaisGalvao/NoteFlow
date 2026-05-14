import { Injectable } from '@nestjs/common';
import { ClickUpAdapter } from './adapters/clickup.adapter';
import { JiraAdapter } from './adapters/jira.adapter';
import { PlannerAdapter } from './adapters/planner.adapter';
import { TeamsAdapter } from './adapters/teams.adapter';

@Injectable()
export class IntegrationsService {
  constructor(
    private readonly teams: TeamsAdapter,
    private readonly planner: PlannerAdapter,
    private readonly jira: JiraAdapter,
    private readonly clickup: ClickUpAdapter,
  ) {}

  listAvailableAdapters() {
    return [
      this.teams.name,
      this.planner.name,
      this.jira.name,
      this.clickup.name,
    ];
  }
}
