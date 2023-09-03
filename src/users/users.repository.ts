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
}
