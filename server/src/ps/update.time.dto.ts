import { IsEnum } from 'class-validator';

export enum Field {
  MidSubmissionStart = 'MidSubmissionStart',
  FinalSubmissionStart = 'FinalSubmissionStart',
  MidDeadline = 'MidDeadline',
  FinalDeadline = 'FinalDeadline',
}
export class UpdateTime {
  id: string;
  @IsEnum(Field)
  field: Field;
  time: Date;
}
