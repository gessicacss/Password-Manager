import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  private SALT = 10;
  constructor(private readonly prisma: PrismaService) {}

  async create(signUpDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        ...signUpDto,
        password: bcrypt.hashSync(signUpDto.password, this.SALT),
      },
    });
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  deleteUser(userId: number) {
    return this.prisma.$transaction(async (prisma) => {
      await prisma.credential.deleteMany({
        where: { userId },
      });
      await prisma.card.deleteMany({
        where: { userId },
      });
      await prisma.note.deleteMany({
        where: { userId },
      });
      await prisma.user.delete({
        where: { id: userId },
      });
    });
  }
}
