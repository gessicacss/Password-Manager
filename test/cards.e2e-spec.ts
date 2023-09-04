import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { cleanDb } from './helpers';
import { createUser } from './factories/users.factory';
import { JwtModule } from '@nestjs/jwt';
import { CardsFactory } from './factories/cards.factory';

describe('CardsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    await cleanDb();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        JwtModule.register({ secret: process.env.JWT_SECRET }),
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = await moduleFixture.get(PrismaService);

    await app.init();
  });

  describe('Cards tests', () => {
    it('POST /cards should be invalid without a field', async () => {
      const user = createUser();
      await request(app.getHttpServer()).post('/users/sign-up').send(user);
      const { text } = await request(app.getHttpServer())
        .post('/users/sign-in')
        .send(user);
      const responseJson = JSON.parse(text);
      const token = responseJson.token;
      const card = await CardsFactory.build();
      delete card.password;
      const response = await request(app.getHttpServer())
        .post('/cards')
        .set('Authorization', `Bearer ${token}`)
        .send(card);
      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('POST /cards should answer 201', async () => {
      const user = createUser();
      await request(app.getHttpServer()).post('/users/sign-up').send(user);
      const { text } = await request(app.getHttpServer())
        .post('/users/sign-in')
        .send(user);
      const responseJson = JSON.parse(text);
      const token = responseJson.token;
      const card = await CardsFactory.build();
      const response = await request(app.getHttpServer())
        .post('/cards')
        .set('Authorization', `Bearer ${token}`)
        .send(card);
      expect(response.statusCode).toBe(HttpStatus.CREATED);
    });
  });
});
