import { Test, TestingModule } from '@nestjs/testing';
import { IitService } from './iit.service';

describe('IitService', () => {
  let service: IitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IitService],
    }).compile();

    service = module.get<IitService>(IitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
