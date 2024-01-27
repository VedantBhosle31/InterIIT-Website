import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './create-submission.dto';
import { AuthGuardJWT } from 'src/auth/utils/LocalGuard';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}
  @UseGuards(AuthGuardJWT)
  @Post('create')
  async create(
    @Request() req,
    @Body() CreateSubmissionDto: CreateSubmissionDto,
  ) {
    return await this.submissionService.create(
      req.decodedData.username,
      CreateSubmissionDto,
    );
  }

  @Get('get')
  async getSubmissionForIIT(
    @Query('iitId') iitId: string,
    @Query('psId') psId: string,
  ) {
    return await this.submissionService.getSubmissionForIIT(iitId, psId);
  }
}
