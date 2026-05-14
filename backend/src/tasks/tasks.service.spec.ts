import { TaskStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  const prismaMock = {
    note: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  } as unknown as PrismaService;

  const tasksService = new TasksService(prismaMock);

  it('uses BACKLOG as default status', async () => {
    const createSpy = jest
      .spyOn(prismaMock.task, 'create')
      .mockResolvedValue({} as never);

    await tasksService.create({ title: '  Tarefa nova ' });

    expect(createSpy).toHaveBeenCalledWith({
      data: {
        title: 'Tarefa nova',
        description: undefined,
        status: TaskStatus.BACKLOG,
      },
    });
  });

  it('keeps informed status', async () => {
    const createSpy = jest
      .spyOn(prismaMock.task, 'create')
      .mockResolvedValue({} as never);

    await tasksService.create({ title: 'A', status: TaskStatus.DONE });

    expect(createSpy).toHaveBeenCalledWith({
      data: {
        title: 'A',
        description: undefined,
        status: TaskStatus.DONE,
      },
    });
  });
});
