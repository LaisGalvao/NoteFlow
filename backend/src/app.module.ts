import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntegrationsModule } from './integrations/integrations.module';
import { NotesModule } from './notes/notes.module';
import { OcrModule } from './ocr/ocr.module';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    PrismaModule,
    NotesModule,
    TasksModule,
    OcrModule,
    IntegrationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
