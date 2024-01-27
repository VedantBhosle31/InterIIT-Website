import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccommodationDto } from './acc.dto';
@Injectable()
export class AccService {
  constructor(private prisma: PrismaService) {}

  async getData(psTeams: string[]) {
    try {
      const data = [];
      for (const psTeam of psTeams) {
        const teamData = await this.prisma.accommodation.findMany({
          where: {
            psTeamId: psTeam,
          },
        });
        data.push(teamData);
      }
      return data;
    } catch (e) {
      return { message: 'Error getting data' };
    }
  }

  async update(accommodationData: AccommodationDto[]) {
    try {
      accommodationData.forEach(async (item) => {
        item.teamMembers.forEach(async (member) => {
          await this.prisma.accommodation.upsert({
            where: {
              memberId: member.id,
            },
            update: {
              sex: member.sex,
              accommodation: member.accommodation,
              startDate: member.startDate,
              endDate: member.endDate,
            },
            create: {
              psTeamId: item.psTeamId,
              memberId: member.id,
              name: member.name,
              sex: member.sex,
              accommodation: member.accommodation,
              startDate: member.startDate,
              endDate: member.endDate,
            },
          });
        });
      });
      return { message: 'Accommodation updated successfully' };
    } catch (e) {
      return { message: 'Error updating accommodation' };
    }
  }
}
