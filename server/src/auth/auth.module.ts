import {
    Module
  } from '@nestjs/common';
  import {
    AuthService
  } from './auth.service';
  import {
    AuthController
  } from './auth.controller';
  import {
    JwtModule
  } from '@nestjs/jwt';
  import {
    jwtConstants
  } from 'src/strategy/constants';
  import {
    IitService
  } from 'src/iit/iit.service';
  import {
    HashService
  } from 'src/iit/hash.service';
  import {
    LocalStrategy
  } from 'src/strategy/local.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './utils/SessionSerializer';
import { PrismaService } from 'src/prisma/prisma.service';
import { IitModule } from 'src/iit/iit.module';
  
  @Module({
    imports: [
     PrismaModule,
     IitModule,
     JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {
          expiresIn: '60d'
        },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService,  IitService, LocalStrategy, HashService, SessionSerializer],
  })
  export class AuthModule {} 