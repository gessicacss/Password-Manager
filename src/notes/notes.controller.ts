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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '../guards/auth.guards';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new notes' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'You already have a note with this title',
  })
  create(@Body() createNoteDto: CreateNoteDto, @User() user: UserPrisma) {
    const { id } = user;
    return this.notesService.create(createNoteDto, id);
  }

  @Get()
  @ApiOperation({ summary: 'Return every note the user have' })
  findAll(@User() user: UserPrisma) {
    const { id } = user;
    return this.notesService.findAll(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a specific user notes' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'You dont have a note with this id',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'This note id isnt yours',
  })
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    const userId = user.id;
    return this.notesService.findOne(+id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a specific user notes' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'You dont have a note with this id',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'This note id isnt yours',
  })
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    const userId = user.id;
    return this.notesService.remove(+id, userId);
  }
}
