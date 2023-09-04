import { faker } from '@faker-js/faker';

export class CardsFactory {
  static async build() {
    const cardData = {
      code: faker.number.int({ min: 10, max: 1000 }).toString(),
      expDate: faker.date.anytime().toString(),
      name: faker.person.fullName(),
      number: faker.number.int({ min: 10, max: 1000 }).toString(),
      password: faker.internet.password({ length: 4 }),
      title: faker.lorem.words(),
      virtual: false,
      type: 'Crédito',
    };

    return cardData;
  }
}
