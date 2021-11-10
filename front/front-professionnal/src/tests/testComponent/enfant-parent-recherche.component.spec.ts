import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfantParentRechercheComponent } from '../../app/enfant-parent-recherche/enfant-parent-recherche.component';

describe('EnfantParentRechercheComponent', () => {
  let component: EnfantParentRechercheComponent;
  let fixture: ComponentFixture<EnfantParentRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnfantParentRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfantParentRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
