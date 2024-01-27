import { Test, TestingModule } from '@nestjs/testing';
import { IitsService } from './iits.service';

describe('IitsService', () => {
  let service: IitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IitsService],
    }).compile();

    service = module.get<IitsService>(IitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
