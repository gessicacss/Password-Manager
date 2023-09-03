import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '../guards/auth.guards';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  create(
    @Body() createCredentialDto: CreateCredentialDto,
    @User() user: UserPrisma,
  ) {
    const { id } = user;
    return this.credentialsService.create(createCredentialDto, id);
  }

  @Get()
  findAll(@User() user: UserPrisma) {
    const { id } = user;
    return this.credentialsService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    const userId = user.id;

    return this.credentialsService.findOne(+id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    const userId = user.id;

    return this.credentialsService.remove(+id, userId);
  }
}
