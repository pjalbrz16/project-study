import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfantRechercheComponent } from '../../app/enfant-recherche/enfant-recherche.component';
describe('EnfantRechercheComponent', () => {
  let component: EnfantRechercheComponent;
  let fixture: ComponentFixture<EnfantRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnfantRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfantRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
