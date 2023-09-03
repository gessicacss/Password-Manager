import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async create(createNoteDto: CreateNoteDto, id) {
    const noteExists = await this.notesRepository.findByTitleAndUserId(
      createNoteDto.title,
      id,
    );
    if (noteExists) {
      throw new ConflictException('This note already exists!');
    }
    return await this.notesRepository.create(createNoteDto, id);
  }

  async findAll(id: number) {
    return await this.notesRepository.findAll(id);
  }

  async verifyNote(id: number, userId: number) {
    const note = await this.notesRepository.findOne(id);
    if (!note) {
      throw new NotFoundException('Theres no note with this id!');
    }

    if (note.userId !== userId) {
      throw new ForbiddenException();
    }

    return note;
  }

  async findOne(id: number, userId: number) {
    const note = await this.verifyNote(id, userId);
    return note;
  }

  async remove(id: number, userId: number) {
    await this.verifyNote(id, userId);
    return await this.notesRepository.remove(id);
  }
}
