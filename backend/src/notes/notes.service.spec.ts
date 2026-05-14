import { PrismaService } from '../prisma/prisma.service';
import { NotesService } from './notes.service';

describe('NotesService', () => {
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

  const notesService = new NotesService(prismaMock);

  it('creates note with generated title fallback', async () => {
    const createSpy = jest
      .spyOn(prismaMock.note, 'create')
      .mockResolvedValue({} as never);

    await notesService.create({
      content: '   Texto capturado para anotação   ',
    });

    expect(createSpy).toHaveBeenCalledWith({
      data: {
        title: 'Texto capturado para anotação',
        content: 'Texto capturado para anotação',
      },
    });
  });

  it('passes explicit title when provided', async () => {
    const createSpy = jest
      .spyOn(prismaMock.note, 'create')
      .mockResolvedValue({} as never);

    await notesService.create({
      title: '  Meu título ',
      content: ' conteúdo ',
    });

    expect(createSpy).toHaveBeenCalledWith({
      data: {
        title: 'Meu título',
        content: 'conteúdo',
      },
    });
  });
});
