import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptrService {
  private Cryptr = require('cryptr');
  private cryptr = new this.Cryptr(process.env.CRYPTR_SECRET);

  encrypt(data: string) {
    return this.cryptr.encrypt(data);
  }

  decrypt(encryptedData: string) {
    return this.cryptr.decrypt(encryptedData);
  }
}
