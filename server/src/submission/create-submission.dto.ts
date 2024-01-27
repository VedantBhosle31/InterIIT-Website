import { IsEnum } from 'class-validator';
import { SubmissionType } from '@prisma/client';

export class CreateSubmissionDto {
  psId: string;
  @IsEnum(SubmissionType)
  submissionType: SubmissionType;
  submissionURL: string;
  description: string;
}
