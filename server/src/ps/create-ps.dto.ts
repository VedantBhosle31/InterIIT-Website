import { PSType } from '@prisma/client';
import { IsEnum } from 'class-validator';
export class CreatePsDto {
  name: string;
  @IsEnum(PSType)
  ps_type: PSType;
  content: string;
  isSacEc?: boolean;
}
