import { TestBed } from '@angular/core/testing';

import { DominanceService } from '../../services/dominance.service';

describe('DominanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DominanceService = TestBed.get(DominanceService);
    expect(service).toBeTruthy();
  });
});
