import { Module } from '@nestjs/common';
import { IitModule } from 'src/iit/iit.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PsteamController } from './psteam.controller';
import { PsteamService } from './psteam.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/iit/hash.service';

@Module({
  imports: [PrismaModule, IitModule],
  controllers: [PsteamController],
  providers: [PsteamService, AuthService, JwtService, HashService],
})
export class PsteamModule {}
