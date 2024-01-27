import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { IitModule } from 'src/iit/iit.module';
import { IitService } from 'src/iit/iit.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PsModule } from 'src/ps/ps.module';
import { PsteamModule } from 'src/psteam/psteam.module';
import { PsteamService } from 'src/psteam/psteam.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/iit/hash.service';

@Module({
  imports: [PrismaModule, IitModule, PsModule, PsteamModule],
  controllers: [SubmissionController],
  providers: [SubmissionService, IitService, PsteamService, AuthService, JwtService, HashService],
})
export class SubmissionModule { }
