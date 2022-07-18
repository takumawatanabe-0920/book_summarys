import { Test, TestingModule } from '@nestjs/testing';
import { CategoryApplication } from '../../api/category/category.application';

describe('CategoryApplication', () => {
  let service: CategoryApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryApplication],
    }).compile();

    service = module.get<CategoryApplication>(CategoryApplication);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
