import { PrismaService } from '../../src/prisma/prisma.service';
import { faker } from '@faker-js/faker';

export class UsersFactory {
  static async build(prisma: PrismaService) {
    return await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
  }
}
