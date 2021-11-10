import { TestBed } from '@angular/core/testing';

import { ConfigurationPartieService } from '../../services/configuration-partie.service';

describe('ConfigurationPartieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigurationPartieService = TestBed.get(ConfigurationPartieService);
    expect(service).toBeTruthy();
  });
});
