import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guards/auth.guards';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto, @User() user: UserPrisma) {
    const { id } = user;

    return this.cardsService.create(createCardDto, id);
  }

  @Get()
  findAll(@User() user: UserPrisma) {
    const { id } = user;

    return this.cardsService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    const userId = user.id;

    return this.cardsService.findOne(+id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    const userId = user.id;

    return this.cardsService.remove(+id, userId);
  }
}
