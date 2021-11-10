import { TestBed } from '@angular/core/testing';

import { EnfantService } from '../../services/enfant.service';

describe('EnfantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnfantService = TestBed.get(EnfantService);
    expect(service).toBeTruthy();
  });
});
