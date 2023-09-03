import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CryptrService } from '../cryptr/cryptr.service';

@Injectable()
export class CardsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptr: CryptrService,
  ) {}

  findByTitleAndUserId(title: string, userId: number) {
    return this.prisma.card.findFirst({
      where: {
        userId,
        title,
      },
    });
  }

  create(data: CreateCardDto, userId: number) {
    return this.prisma.card.create({
      data: {
        ...data,
        password: this.cryptr.encrypt(data.password),
        code: this.cryptr.encrypt(data.code),
        userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.card.findMany({
      where: { userId },
    });
  }

  findOne(id: number) {
    return this.prisma.card.findUnique({
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.card.delete({
      where: { id },
    });
  }
}
