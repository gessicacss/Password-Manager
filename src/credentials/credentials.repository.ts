import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CryptrService } from '../cryptr/cryptr.service';

@Injectable()
export class CredentialsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptr: CryptrService,
  ) {}

  findByTitleAndUserId(userId: number, title: string) {
    return this.prisma.credential.findFirst({
      where: {
        userId,
        title,
      },
    });
  }

  create(data: CreateCredentialDto, userId: number) {
    return this.prisma.credential.create({
      data: { ...data, password: this.cryptr.encrypt(data.password), userId },
    });
  }

  findAll(userId: number) {
    return this.prisma.credential.findMany({
      where: { userId },
    });
  }

  findOne(id: number) {
    return this.prisma.credential.findUnique({
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.credential.delete({
      where: { id },
    });
  }
}
