import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '../guards/auth.guards';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('credentials')
@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new credential' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'You already have a credential with this title',
  })
  create(
    @Body() createCredentialDto: CreateCredentialDto,
    @User() user: UserPrisma,
  ) {
    const { id } = user;
    return this.credentialsService.create(createCredentialDto, id);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all credentials the user have' })
  findAll(@User() user: UserPrisma) {
    const { id } = user;
    return this.credentialsService.findAll(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a specific user credential' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'You dont have a credential with this id',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'This credential id isnt yours',
  })
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    const userId = user.id;

    return this.credentialsService.findOne(+id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a specific user credential' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'You dont have a credential with this id',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'This credential id isnt yours',
  })
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    const userId = user.id;

    return this.credentialsService.remove(+id, userId);
  }
}
