import { Module } from '@nestjs/common';
import { IitsService } from './iits.service';
import { IitsController } from './iits.controller';

@Module({
  controllers: [IitsController],
  providers: [IitsService]
})
export class IitsModule {}
