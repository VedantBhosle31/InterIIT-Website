import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IitModule } from './iit/iit.module';
import { AuthModule } from './auth/auth.module';
import { PsteamModule } from './psteam/psteam.module';
import { PassportModule } from '@nestjs/passport';
import { PsModule } from './ps/ps.module';
import { SubmissionModule } from './submission/submission.module';
import { AccModule } from './accommodation/acc.module';
import { ContentionModule } from './contention/contention.module';
@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    IitModule,
    AuthModule,
    PsteamModule,
    PsModule,
    SubmissionModule,
    AccModule,
    ContentionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
