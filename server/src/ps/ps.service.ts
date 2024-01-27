import {
  Injectable,
  Inject,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePsDto } from './create-ps.dto';
import { IitService } from 'src/iit/iit.service';
import { UserRole } from '@prisma/client';
import { forwardRef } from '@nestjs/common';
import { createECDH } from 'crypto';
import { Field, UpdateTime } from './update.time.dto';
import e from 'express';
@Injectable()
export class PsService {
  constructor(
    @Inject(IitService) private iitService: IitService,
    private prisma: PrismaService,
  ) {}

  async deleteAll() {
    return await this.prisma.pS.deleteMany({});
  }
  async findById(id: string) {
    return await this.prisma.pS.findFirst({
      where: {
        id: id,
      },
    });
  }
  async findall(username: string) {
    let userDB = await this.iitService.getUserByUsername(username);
    let listPS = await this.prisma.pS.findMany({});
    listPS.forEach((ps) => {
      let ps_teams = userDB.ps_teams;
      let registered: boolean = false;
      const now = new Date();
      const mid = new Date(ps.MidDeadline);

      const finalSub = new Date(ps.FinalDeadline);
      if (now < mid) {
        ps['submissionType'] = 'MID';
      } else if (now > mid && now < finalSub) {
        ps['submissionType'] = 'FINAL';
      } else {
        ps['submissionType'] = 'NONE';
      }
      ps_teams.forEach((ps_team) => {
        if (ps_team.ps_id === ps.id) {
          registered = true;
        }
      });

      if (registered) {
        ps['registered'] = 'true';
      } else {
        ps['registered'] = 'false';
      }
    });
    return listPS;
  }
  async getPs(ps_id: string) {
    return this.prisma.pS.findFirst({
      where: {
        id: ps_id,
      },
    });
  }
  async create(username: string, createPsDto: CreatePsDto) {
    let userDB = await this.iitService.getUserByUsername(username);
    if (userDB.role == UserRole.PARTICIPANT) {
      throw new UnauthorizedException();
      return;
    } else {
      let ps = await this.prisma.pS.create({
        data: {
          name: createPsDto.name,
          content: createPsDto.content,
          psType: createPsDto.ps_type,
          isSacEc: createPsDto.isSacEc ?? false,
        },
      });
      return ps;
    }
  }
  async updatetime(username: string, updatetime: UpdateTime) {
    let userDB = await this.iitService.getUserByUsername(username);
    if (userDB.role == UserRole.PARTICIPANT) {
      throw new UnauthorizedException();
      return;
    } else {
      switch (updatetime.field) {
        case Field.FinalDeadline:
          return this.prisma.pS.update({
            where: {
              id: updatetime.id,
            },
            data: {
              FinalDeadline: updatetime.time,
            },
          });
        case Field.MidDeadline:
          return this.prisma.pS.update({
            where: {
              id: updatetime.id,
            },
            data: {
              MidDeadline: updatetime.time,
            },
          });
        case Field.FinalSubmissionStart:
          return this.prisma.pS.update({
            where: {
              id: updatetime.id,
            },
            data: {
              FinalSubmissionStart: updatetime.time,
            },
          });
        case Field.MidSubmissionStart:
          return this.prisma.pS.update({
            where: {
              id: updatetime.id,
            },
            data: {
              MidSubmissionStart: updatetime.time,
            },
          });
      }
    }
  }
}
