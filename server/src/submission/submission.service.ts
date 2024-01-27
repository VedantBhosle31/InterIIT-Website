import { Inject, Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './create-submission.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IitService } from 'src/iit/iit.service';
import { PsteamService } from 'src/psteam/psteam.service';
import { PsService } from 'src/ps/ps.service';
import { use } from 'passport';
import { GetSubmissionForIIT } from './getSubmissionForIIT.output';

@Injectable()
export class SubmissionService {
  constructor(
    private prisma: PrismaService,
    @Inject(IitService) private iitService: IitService,
    @Inject(PsteamService) private psteamService: PsteamService,
    @Inject(PsService) private psService: PsService,
  ) {}

  async create(username: string, CreateSubmissionDto: CreateSubmissionDto) {
    const user = await this.iitService.getUserByUsername(username);
    let userid = user.id;

    const Psteam = await this.prisma.pSTeam.findFirst({
      where: {
        iit_id: user.id,
        ps_id: CreateSubmissionDto.psId,
      },
    });

    const ps = await this.psService.getPs(CreateSubmissionDto.psId);
    const MidSubmissionStart = new Date(ps.MidSubmissionStart);
    const FinalSubmissionStart = new Date(ps.FinalSubmissionStart);
    const MidDeadline = new Date(ps.MidDeadline);
    const FinalDeadline = new Date(ps.FinalDeadline);
    let now = new Date();

    try {
      if (
        (CreateSubmissionDto.submissionType == 'MID' &&
          now > MidSubmissionStart &&
          now <= MidDeadline) ||
        (CreateSubmissionDto.submissionType == 'FINAL' &&
          now > FinalSubmissionStart &&
          now <= FinalDeadline)
      ) {
        var submission = await this.prisma.submission.create({
          data: {
            pSTeamId: Psteam.id,
            submissionType: CreateSubmissionDto.submissionType,
            submissionURL: CreateSubmissionDto.submissionURL,
            description: CreateSubmissionDto.description,
          },
        });
      } else {
        throw new Error('Unable to create submission');
      }
      return submission;
    } catch (err) {
      throw new Error('Invalid Submission');
    }
  }

  async getSubmissionForIIT(iITId: string, pSId: string) {
    const Psteam = await this.prisma.pSTeam.findFirst({
      where: {
        iit_id: iITId,
        ps_id: pSId,
      },
    });
    const ps = await this.psService.getPs(pSId);
    let output = {
      mid: null,
      final: null,
      midStart: ps.MidSubmissionStart,
      midEnd: ps.MidDeadline,
      finalStart: ps.FinalSubmissionStart,
      finalEnd: ps.FinalDeadline,
    };
    if (!Psteam) return output;
    try {
      let psMid = await this.prisma.submission.findFirst({
        where: {
          pSTeamId: Psteam.id,
          submissionType: 'MID',
        },
      });
      let psFinal = await this.prisma.submission.findFirst({
        where: {
          pSTeamId: Psteam.id,
          submissionType: 'FINAL',
        },
      });
      if (psMid || psFinal) {
        output['mid'] = psMid;
        output['final'] = psFinal;
      }
      return output;
    } catch (err) {
      throw new Error('Submission not found');
    }
  }
}
