import { Module } from '@nestjs/common';
import { IitModule } from 'src/iit/iit.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ContentionController } from './contention.controller';
import { ContentionService } from './contention.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/iit/hash.service';

@Module({
  imports: [PrismaModule, IitModule],
  controllers: [ContentionController],
  providers: [ContentionService, AuthService, JwtService, HashService],
})
export class ContentionModule {}
