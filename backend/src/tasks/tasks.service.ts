import { Injectable } from '@nestjs/common';
import { TaskStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.task.findMany({ orderBy: { updatedAt: 'desc' } });
  }

  create(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title.trim(),
        description: dto.description?.trim(),
        status: dto.status ?? TaskStatus.BACKLOG,
      },
    });
  }

  update(id: number, dto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title?.trim(),
        description: dto.description?.trim(),
        status: dto.status,
      },
    });
  }

  delete(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
