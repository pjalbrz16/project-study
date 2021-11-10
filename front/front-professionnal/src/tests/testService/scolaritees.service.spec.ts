import { TestBed } from '@angular/core/testing';

import { ScolariteesService } from '../../services/scolaritees.service';

describe('ScolariteesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScolariteesService = TestBed.get(ScolariteesService);
    expect(service).toBeTruthy();
  });
});
