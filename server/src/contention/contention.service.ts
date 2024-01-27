import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IitService } from 'src/iit/iit.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContentionStatus, UserRole } from '@prisma/client';

@Injectable()
export class ContentionService {
  constructor(
    @Inject(IitService) private iitService: IitService,
    private prisma: PrismaService,
  ) {}

  async create(username: string, psId: string) {
    try {
      let userDB = await this.iitService.getUserByUsername(username);
      if (userDB.role == UserRole.PARTICIPANT) {
        throw new UnauthorizedException();
      } else {
        const { psType } = await this.prisma.pS.findUnique({
          where: {
            id: psId,
          },
          select: {
            psType: true,
          },
        });
        const psTeams = await this.prisma.pSTeam.findMany({
          where: {
            ps_id: psId,
          },
        });
        const contentionsCount = psType == 'HIGH' || psType == 'MID' ? 3 : 2;
        psTeams.forEach(async (psTeam) => {
          const contention = await this.prisma.contention.create({
            data: {
              pSTeamId: psTeam.id,
              count: contentionsCount,
            },
          });
          for (let i = 0; i < contentionsCount; i++) {
            await this.prisma.contentionItem.create({
              data: {
                contention: {
                  connect: {
                    id: contention.id,
                  },
                },
              },
            });
          }
        });
        return { message: 'Contention created successfully' };
      }
    } catch (e) {
      return { message: 'Error getting data', error: e.message };
    }
  }

  async get(psTeamId: string) {
    try {
      const availableContentions = await this.prisma.contention.findUnique({
        where: {
          pSTeamId: psTeamId,
        },
        select: {
          id: true,
          pSTeamId: true,
          count: true,
          contentions: {
            where: {
              status: ContentionStatus.NOT_RAISED,
            },
            select: {
              id: true,
            },
          },
        },
      });
      const unavailableContentions = await this.prisma.contention.findMany({
        where: {
          pSTeamId: psTeamId,
        },
        select: {
          contentions: {
            where: {
              NOT: {
                status: ContentionStatus.NOT_RAISED,
              },
            },
            select: {
              against: true,
              description: true,
              status: true,
            },
          },
        },
      });
      return {
        availableContentions: availableContentions.contentions,
        unavailableContentions: unavailableContentions[0].contentions,
      };
    } catch (e) {
      return { message: 'Error getting data', error: e.message };
    }
  }

  async getAll(psId: string) {
    try {
      const psTeams = await this.prisma.pSTeam.findMany({
        where: {
          ps_id: psId,
        },
      });
      const contentions = psTeams.map(async (psTeam) => {
        const data = await this.prisma.contention.findUnique({
          where: {
            pSTeamId: psTeam.id,
          },
          select: {
            id: true,
            pSTeamId: true,
            count: true,
            contentions: {
              where: {
                status: ContentionStatus.PENDING,
              },
            },
          },
        });
        const team = await this.prisma.iIT.findUnique({
          where: {
            id: psTeam.iit_id,
          },
          select: {
            iitNumber: true,
          },
        });
        if (data !== null) data['team'] = 'Team ' + team.iitNumber;
        return data;
      });
      const resolvedContentions = await Promise.all(contentions);
      if (resolvedContentions[0] == null) {
        return { created: false };
      }
      return { created: true, contentionData: resolvedContentions };
    } catch (e) {
      return {
        created: false,
        message: 'Error getting data',
        error: e.message,
      };
    }
  }

  async raiseContention(
    contentionItemId: string,
    against: string,
    description: string,
  ) {
    try {
      const contentionItem = await this.prisma.contentionItem.findUnique({
        where: {
          id: contentionItemId,
          status: ContentionStatus.NOT_RAISED,
        },
        select: {
          contention: {
            select: {
              count: true,
            },
          },
        },
      });
      if (contentionItem.contention.count == 0) {
        throw new Error('Contention limit reached');
      }
      const updatedContentionItem = await this.prisma.contentionItem.update({
        where: {
          id: contentionItemId,
        },
        data: {
          against,
          description,
          status: ContentionStatus.PENDING,
        },
      });
      const updatedContention = await this.prisma.contention.update({
        where: {
          id: updatedContentionItem.contentionId,
        },
        data: {
          count: {
            decrement: 1,
          },
        },
      });
      return { message: 'Contention raised successfully' };
    } catch (e) {
      return { message: 'Error in raising contention', error: e.message };
    }
  }

  async updateStatus(
    username: string,
    contentionItemId: string,
    approved: boolean,
  ) {
    try {
      let userDB = await this.iitService.getUserByUsername(username);
      if (userDB.role == UserRole.PARTICIPANT) {
        throw new UnauthorizedException();
      } else {
        const updatedContentionItem = await this.prisma.contentionItem.update({
          where: {
            id: contentionItemId,
          },
          data: {
            status: approved
              ? ContentionStatus.ACCEPTED
              : ContentionStatus.REJECTED,
          },
        });
        if (approved) {
          const newContentionItem = await this.prisma.contentionItem.create({
            data: {
              contention: {
                connect: {
                  id: updatedContentionItem.contentionId,
                },
              },
            },
          });
        }
        const updatedContention = await this.prisma.contention.update({
          where: {
            id: updatedContentionItem.contentionId,
          },
          data: {
            count: {
              increment: approved ? 1 : 0,
            },
          },
        });
        return { message: 'Contention updated successfully' };
      }
    } catch (e) {
      return { message: 'Error in updating', error: e.message };
    }
  }
}
