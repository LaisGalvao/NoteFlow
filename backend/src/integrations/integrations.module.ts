import { Module } from '@nestjs/common';
import { ClickUpAdapter } from './adapters/clickup.adapter';
import { JiraAdapter } from './adapters/jira.adapter';
import { PlannerAdapter } from './adapters/planner.adapter';
import { TeamsAdapter } from './adapters/teams.adapter';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';

@Module({
  controllers: [IntegrationsController],
  providers: [
    IntegrationsService,
    TeamsAdapter,
    PlannerAdapter,
    JiraAdapter,
    ClickUpAdapter,
  ],
  exports: [IntegrationsService],
})
export class IntegrationsModule {}
