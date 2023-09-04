import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guards';
import { UsersService } from './users.service';
import { EraseUserDTO } from './dto/erase-user.dto';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('erase')
@UseGuards(AuthGuard)
@Controller('erase')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Delete()
  @ApiOperation({ summary: 'It deletes a user and all its datas' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Your password is wrong!',
  })
  eraseUser(@Body() eraseUserDTO: EraseUserDTO, @User() user: UserPrisma) {
    return this.userServices.eraseUser(eraseUserDTO.password, user);
  }
}
