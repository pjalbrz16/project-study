import { TestBed } from '@angular/core/testing';

import { RelationsService } from '../../services/relations.service';

describe('RelationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelationsService = TestBed.get(RelationsService);
    expect(service).toBeTruthy();
  });
});
