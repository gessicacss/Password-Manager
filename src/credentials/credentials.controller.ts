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
    @User() user: UserPrisma
  ) {
    return this.credentialsService.create(createCredentialDto);
  }

  @Get()
  findAll(@User() user: UserPrisma) {
    return this.credentialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.credentialsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    return this.credentialsService.remove(+id);
  }
}
