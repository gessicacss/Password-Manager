import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { cleanDb } from './helpers';
import { UsersFactory, createUser } from './factories/users.factory';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    await cleanDb();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = await moduleFixture.get(PrismaService);

    await app.init();
  });

  describe('Users tests', () => {
    it('POST /users/sign-up should be invalid without a field', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/sign-up')
        .send({ email: '', password: '' });
      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('POST /users/sign-up should return 409 if a user with an email already exists', async () => {
      const user = await UsersFactory.build(prisma);
      const response = await request(app.getHttpServer())
        .post('/users/sign-up')
        .send({ email: user.email, password: 'Str0ngP@ss' });
      expect(response.statusCode).toBe(HttpStatus.CONFLICT);
    });

    it('POST /users/sign-up should return 201', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/sign-up')
        .send({ email: 'myemail@gmail.com', password: 'Str0ngP@ss' });
      expect(response.statusCode).toBe(HttpStatus.CREATED);
    });

    it('POST /users/sign-in should be invalid without a field', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/sign-in')
        .send({ email: '', password: '' });
      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('POST /users/sign-in should return 401 with wrong password', async () => {
      const user = await UsersFactory.build(prisma);
      const response = await request(app.getHttpServer())
        .post('/users/sign-in')
        .send({ email: user.email, password: 'Str0ngP@ss' });
      expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('POST /users/sign-in should return 200', async () => {
      const user = createUser();
      await request(app.getHttpServer()).post('/users/sign-up').send(user);
      const response = await request(app.getHttpServer())
        .post('/users/sign-in')
        .send(user);
      expect(response.statusCode).toBe(HttpStatus.OK);
    });
  });
});
