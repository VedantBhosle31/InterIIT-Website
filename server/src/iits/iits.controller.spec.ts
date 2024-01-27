import { Test, TestingModule } from '@nestjs/testing';
import { IitsController } from './iits.controller';
import { IitsService } from './iits.service';

describe('IitsController', () => {
  let controller: IitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IitsController],
      providers: [IitsService],
    }).compile();

    controller = module.get<IitsController>(IitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
