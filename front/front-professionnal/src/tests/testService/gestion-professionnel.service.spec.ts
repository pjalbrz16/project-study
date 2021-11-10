import { TestBed } from '@angular/core/testing';

import { GestionProfessionnelService } from '../../services/gestion-professionnel.service';

describe('GestionProfessionnelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionProfessionnelService = TestBed.get(GestionProfessionnelService);
    expect(service).toBeTruthy();
  });
});
