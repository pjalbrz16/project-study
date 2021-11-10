import { TestBed } from '@angular/core/testing';

import { ListeDonneesService } from '../../services/liste-donnees.service';

describe('ListeDonneesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListeDonneesService = TestBed.get(ListeDonneesService);
    expect(service).toBeTruthy();
  });
});
