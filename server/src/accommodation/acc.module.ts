import { Module } from '@nestjs/common';
import { IitModule } from 'src/iit/iit.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccController } from './acc.controller';
import { AccService } from './acc.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/iit/hash.service';

@Module({
  imports: [PrismaModule, IitModule],
  controllers: [AccController],
  providers: [AccService, AuthService, JwtService, HashService],
})
export class AccModule {}
