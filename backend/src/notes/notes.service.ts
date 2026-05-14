import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

const MAX_AUTO_TITLE_LENGTH = 60;

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.note.findMany({ orderBy: { updatedAt: 'desc' } });
  }

  create(dto: CreateNoteDto) {
    const content = dto.content.trim();
    return this.prisma.note.create({
      data: {
        title:
          dto.title?.trim() ||
          content.slice(0, MAX_AUTO_TITLE_LENGTH) ||
          'Nova anotação',
        content,
      },
    });
  }

  update(id: number, dto: UpdateNoteDto) {
    return this.prisma.note.update({
      where: { id },
      data: {
        title: dto.title?.trim(),
        content: dto.content?.trim(),
      },
    });
  }

  delete(id: number) {
    return this.prisma.note.delete({ where: { id } });
  }
}
