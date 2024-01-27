import { Module } from '@nestjs/common';
import { IitModule } from 'src/iit/iit.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PsController } from './ps.controller';
import { PsService } from './ps.service';
import { AuthService } from 'src/auth/auth.service';
import { HashService } from 'src/iit/hash.service';
import { JwtService } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common';
@Module({
  imports: [PrismaModule, IitModule],
  controllers: [PsController],
  providers: [PsService, AuthService, HashService, JwtService],
  exports: [PsService],
})
export class PsModule {}
