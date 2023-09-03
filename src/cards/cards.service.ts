import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CryptrService } from '../cryptr/cryptr.service';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsService {
  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly cryptr: CryptrService,
  ) {}

  async create(createCardDto: CreateCardDto, userId: number) {
    const cardExists = await this.cardsRepository.findByTitleAndUserId(
      createCardDto.title,
      userId,
    );
    if (cardExists) {
      throw new ConflictException('You already have a card with this title!');
    }

    const card = await this.cardsRepository.create(createCardDto, userId);
    delete card.password;
    delete card.code;
    return card;
  }

  async findAll(userId: number) {
    const cards = await this.cardsRepository.findAll(userId);
    const decryptedCards = cards.map((card) => {
      return {
        ...card,
        password: this.cryptr.decrypt(card.password),
        code: this.cryptr.decrypt(card.code),
      };
    });
    return decryptedCards;
  }

  async verifyCard(id: number, userId: number) {
    const card = await this.cardsRepository.findOne(id);
    if (!card) {
      throw new NotFoundException('Theres no card with this id!');
    }

    if (card.userId !== userId) {
      throw new ForbiddenException();
    }

    return card;
  }

  async findOne(id: number, userId: number) {
    const card = await this.verifyCard(id, userId);
    const decryptedCard = {
      ...card,
      password: this.cryptr.decrypt(card.password),
      code: this.cryptr.decrypt(card.code),
    };

    return decryptedCard;
  }

  async remove(id: number, userId: number) {
    await this.verifyCard(id, userId);
    return await this.cardsRepository.remove(id);
  }
}
