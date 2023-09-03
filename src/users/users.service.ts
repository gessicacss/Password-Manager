import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

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

  eraseUser() {
    throw new Error('Method not implemented.');
  }
}
