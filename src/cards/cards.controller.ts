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
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guards/auth.guards';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cards')
@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new card' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'You already have a card with this title',
  })
  create(@Body() createCardDto: CreateCardDto, @User() user: UserPrisma) {
    const { id } = user;

    return this.cardsService.create(createCardDto, id);
  }

  @Get()
  @ApiOperation({ summary: 'Return every card the user have' })
  findAll(@User() user: UserPrisma) {
    const { id } = user;

    return this.cardsService.findAll(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a specific user card' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'You dont have a card with this id',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'This card id isnt yours',
  })
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    const userId = user.id;

    return this.cardsService.findOne(+id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a specific user card' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'You dont have a card with this id',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'This card id isnt yours',
  })
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    const userId = user.id;

    return this.cardsService.remove(+id, userId);
  }
}
