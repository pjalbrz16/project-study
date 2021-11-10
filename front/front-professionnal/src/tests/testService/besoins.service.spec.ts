import { TestBed } from '@angular/core/testing';

import { BesoinsService } from '../../services/besoins.service';

describe('BesoinsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BesoinsService = TestBed.get(BesoinsService);
    expect(service).toBeTruthy();
  });
});
