import { PartialType } from '@nestjs/mapped-types';
import { CreateIitDto } from './create-iit.dto';

export class UpdateIitDto extends PartialType(CreateIitDto) {}
