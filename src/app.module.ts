import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CredentialsModule } from './credentials/credentials.module';
import { NotesModule } from './notes/notes.module';
import { CardsModule } from './cards/cards.module';
import { CryptrModule } from './cryptr/cryptr.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    CredentialsModule,
    NotesModule,
    CardsModule,
    CryptrModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
