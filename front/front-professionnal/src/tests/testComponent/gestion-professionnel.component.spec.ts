import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProfessionnelComponent } from '../../app/gestion-professionnel/gestion-professionnel.component';

describe('GestionProfessionnelComponent', () => {
  let component: GestionProfessionnelComponent;
  let fixture: ComponentFixture<GestionProfessionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionProfessionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProfessionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
