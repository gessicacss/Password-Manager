import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(userDto: CreateUserDto) {
    const { email } = userDto;
    const user = await this.usersRepository.getUserByEmail(email);
    if (user) {
      throw new ConflictException('This email is already in use!');
    }

    return await this.usersRepository.create(userDto);
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.getUserByEmail(email);
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.getUserById(id);
    if (!user) throw new NotFoundException('Theres no user with this id');

    return user;
  }

  async eraseUser(password: string, user: User) {
    const isPasswordRight = await bcrypt.compare(password, user.password);
    if (!isPasswordRight) {
      throw new UnauthorizedException('Incorrect password!');
    }

    await this.usersRepository.deleteUser(user.id);
  }
}
