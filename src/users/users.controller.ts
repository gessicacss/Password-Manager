import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guards';
import { UsersService } from './users.service';
import { EraseUserDTO } from './dto/erase-user.dto';

@UseGuards(AuthGuard)
@Controller('erase')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Delete()
  eraseUser(@Body() eraseUserDTO: EraseUserDTO, @User() user: UserPrisma) {
    console.log(eraseUserDTO);
    return this.userServices.eraseUser();
  }
}
