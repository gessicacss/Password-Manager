import { faker } from '@faker-js/faker';

export class CredentialsFactory {
  static async build() {
    const credentialsData = {
      title: faker.lorem.words(),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    return credentialsData;
  }
}
