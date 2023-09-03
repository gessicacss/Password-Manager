import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CredentialsRepository } from './credentials.repository';
import { CryptrService } from '../cryptr/cryptr.service';

@Injectable()
export class CredentialsService {
  constructor(
    private readonly credentialsRepository: CredentialsRepository,
    private readonly cryptr: CryptrService,
  ) {}

  async create(createCredentialDto: CreateCredentialDto, userId: number) {
    const credentialExists =
      await this.credentialsRepository.findByTitleAndUserId(
        userId,
        createCredentialDto.title,
      );
    if (credentialExists) {
      throw new ConflictException('This credential already exists!');
    }

    const credential = await this.credentialsRepository.create(
      createCredentialDto,
      userId,
    );
    delete credential.password;
    return credential;
  }

  async findAll(id: number) {
    const credentials = await this.credentialsRepository.findAll(id);
    const decryptedCredentials = credentials.map((cred) => {
      return {
        ...cred,
        password: this.cryptr.decrypt(cred.password),
      };
    });
    return decryptedCredentials;
  }

  async verifyCredential(id: number, userId: number) {
    const credential = await this.credentialsRepository.findOne(id);
    if (!credential) {
      throw new NotFoundException('Theres no credential with this id!');
    }

    if (credential.userId !== userId) {
      throw new ForbiddenException();
    }

    return credential;
  }

  async findOne(id: number, userId: number) {
    const credential = await this.verifyCredential(id, userId);
    const decryptedCredential = {
      ...credential,
      password: this.cryptr.decrypt(credential.password),
    };

    return decryptedCredential;
  }

  async remove(id: number, userId: number) {
    await this.verifyCredential(id, userId);
    return await this.credentialsRepository.remove(id);
  }
}
