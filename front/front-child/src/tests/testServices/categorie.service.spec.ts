import { TestBed } from '@angular/core/testing';

import { CategorieService } from '../../services/categorie.service';

describe('CategorieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategorieService = TestBed.get(CategorieService);
    expect(service).toBeTruthy();
  });
});
