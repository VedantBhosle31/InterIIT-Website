import { Test, TestingModule } from '@nestjs/testing';
import { IitController } from './iit.controller';

describe('IitController', () => {
  let controller: IitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IitController],
    }).compile();

    controller = module.get<IitController>(IitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
