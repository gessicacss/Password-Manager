import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByTitleAndUserId(title: string, id: number) {
    return this.prisma.note.findFirst({
      where: {
        userId: id,
        title: title,
      },
    });
  }

  create(data: CreateNoteDto, userId: number) {
    return this.prisma.note.create({
      data: { ...data, userId },
    });
  }

  findAll(userId: number) {
    return this.prisma.note.findMany({
      where: { userId },
    });
  }

  findOne(id: number) {
    return this.prisma.note.findUnique({
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.note.delete({
      where: { id },
    });
  }
}
