import { TestBed, inject } from '@angular/core/testing';

import { CensusblockService } from './censusblock.service';

describe('CensusblockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CensusblockService]
    });
  });

  it('should be created', inject([CensusblockService], (service: CensusblockService) => {
    expect(service).toBeTruthy();
  }));
});
