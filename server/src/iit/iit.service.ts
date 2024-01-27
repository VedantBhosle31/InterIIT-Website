import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IIT, PSType, PrismaClient, UserRole } from '@prisma/client';
import { CreateIITDto } from './create-iit.dto';
import { HashService } from './hash.service';
import { CreatePsteamDto } from 'src/psteam/create-psteam.dto';
import { serialize } from 'class-transformer';
import { PsService } from 'src/ps/ps.service';
import { feesPerHead } from 'src/util/constants';
import { maxTeamSize } from 'src/util/constants';
import { CreateLeadDto, CreateLeadsDto } from './create-lead.dto';
import { createECDH } from 'crypto';
import { create } from 'domain';
@Injectable()
export class IitService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService, //@Inject(PsService) private psService: PsService,
  ) {}

  findall() {
    return this.prisma.iIT.findMany();
  }

  async getUserByUsername(username: string, relations?: string[]) {
    let response = await this.prisma.iIT.findFirst({
      where: {
        name: username,
      },
      include: {
        ps_teams: {
          include: {
            team_members: true,
          },
        },
      },
    });
    //delete response.password;
    return response;
  }
  async getTeamMembers(username: string, ps_id: string) {
    let team_members;
    let data = await this.getUserByUsername(username);
    data.ps_teams.forEach((ps_team) => {
      if (ps_team.ps_id === ps_id) {
        team_members = ps_team.team_members;
      }
    });
    return {
      team_members: team_members,
    };
  }
  async addLead(createLeadDto: CreateLeadDto): Promise<string> {
    const leader = await this.prisma.leader.create({
      data: {
        name: createLeadDto.name,
        email: createLeadDto.email,
        photo_url: createLeadDto.photo_url,
        phone: createLeadDto.phone,
        discordId: createLeadDto.discordId,
        idCardUrl: createLeadDto.idCardUrl,
        tshirt: createLeadDto.tshirt,
        foodPref: createLeadDto.foodPref,
      },
    });
    return leader.id;
  }
  async getLeads(username: string) {
    let userDB = await this.getUserByUsername(username);
    const contingentLead = await this.prisma.leader.findFirst({
      where: {
        id: userDB.contingentLeaderId,
      },
    });

    const deputyContingentLead = await this.prisma.leader.findFirst({
      where: {
        id: userDB.deputyContingentLeaderId,
      },
    });

    const coCas = await this.prisma.leader.findFirst({
      where: {
        id: userDB.coCasId,
      },
    });
    let deputyContingentLead2 = null;
    if (userDB.deputyContingentLeaderId2 != null)
      deputyContingentLead2 = await this.prisma.leader.findFirst({
        where: {
          id: userDB.deputyContingentLeaderId2,
        },
      });
    return {
      contingentLead: contingentLead,
      deputyContingentLead: deputyContingentLead,
      deputyContingentLead2: deputyContingentLead2,
      coCas: coCas,
    };
  }
  async addLeads(username: string, createLeadsDto: CreateLeadsDto) {
    let userDB = await this.getUserByUsername(username);
    if (createLeadsDto.coCas == null) {
      return await this.prisma.iIT.update({
        where: {
          id: userDB.id,
        },
        data: {
          contingentLeaderId: null,
          deputyContingentLeaderId: null,
          coCasId: null,
        },
      });
    }
    //let userDB = await this.getUserByUsername(username);
    const contingentLeadId = await this.addLead(createLeadsDto.contingentLead);
    const deputyContingentLeadId = await this.addLead(
      createLeadsDto.deputyContingentLead,
    );
    const coCasId = await this.addLead(createLeadsDto.coCas);
    let deputyContingentLeadId2: string = null;
    if (
      !Object.values(createLeadsDto.deputyContingentLead2).some(
        (value) => value === '',
      )
    )
      deputyContingentLeadId2 = await this.addLead(
        createLeadsDto.deputyContingentLead2,
      );
    return await this.prisma.iIT.update({
      where: {
        id: userDB.id,
      },
      data: {
        contingentLeaderId: contingentLeadId,
        deputyContingentLeaderId: deputyContingentLeadId,
        deputyContingentLeaderId2: deputyContingentLeadId2,
        coCasId: coCasId,
      },
    });
  }

  async getAllTeamsAgainstIIT(iitId: string) {
    try {
      const teamObjects = await this.prisma.iIT.findMany({
        where: {
          id: {
            not: iitId,
          },
          role: {
            not: 'ADMIN',
          },
        },
        select: {
          iitNumber: true,
        },
      });
      const teams = teamObjects.map((team) => {
        return 'Team ' + team.iitNumber;
      });
      return teams;
    } catch (e) {
      throw new Error('Unable to get teams');
    }
  }

  async addPsteam(username: string, createPsteamDto: CreatePsteamDto) {
    try {
      const userDB = await this.getUserByUsername(username);
      let fee = userDB.feeToBePaid;

      const psDB = await this.prisma.pS.findFirst({
        where: {
          id: createPsteamDto.psname,
        },
      });
      if (psDB.psType == PSType.HIGH) {
        fee = fee + feesPerHead.HIGH_PREP * createPsteamDto.participants.length;
        createPsteamDto.participants = createPsteamDto.participants.slice(
          0,
          maxTeamSize.HIGH_PREP,
        );
      } else if (psDB.psType == PSType.MID) {
        fee = fee + feesPerHead.MID_PREP * createPsteamDto.participants.length;
        createPsteamDto.participants = createPsteamDto.participants.slice(
          0,
          maxTeamSize.MID_PREP,
        );
      } else if (psDB.psType == PSType.LOW) {
        fee = fee + feesPerHead.LOW_PREP * createPsteamDto.participants.length;
        createPsteamDto.participants = createPsteamDto.participants.slice(
          0,
          psDB.isSacEc ? maxTeamSize.SAC_EC : maxTeamSize.LOW_PREP,
        );
      } else if (psDB.psType == PSType.NO) {
        fee = fee + feesPerHead.NO_PREP * createPsteamDto.participants.length;
        createPsteamDto.participants = createPsteamDto.participants.slice(
          0,
          maxTeamSize.NO_PREP,
        );
      }

      await this.prisma.iIT.update({
        where: {
          name: username,
        },
        data: {
          feeToBePaid: fee,
          ps_teams: {
            create: {
              ps_id: createPsteamDto.psname,
              team_members: {
                createMany: {
                  data: createPsteamDto.participants,
                },
              },
            },
          },
        },
      });
    } catch (e) {
      return { error: e.message };
    }
  }
  async registerUser(createiitdto: CreateIITDto) {
    var password = await this.hashService.hashPassword(createiitdto.password);
    return await this.prisma.iIT.create({
      data: {
        name: createiitdto.name,
        password: password,
        iitNumber: createiitdto.iitNumber,
        role: createiitdto.role,
      },
    });
  }
  async verifyPayment(currentUsername: string, body) {
    let username = body.name;
    let amount = body.amount;
    let currentUserDB = await this.getUserByUsername(currentUsername);
    if (currentUserDB.role != UserRole.ADMIN) {
      throw new UnauthorizedException();
      return;
    } else {
      let userDB = await this.getUserByUsername(username);
      return this.prisma.iIT.update({
        where: {
          name: username,
        },
        data: {
          feeApproved: Number(amount),
        },
      });
    }
  }
}
