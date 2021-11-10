import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneRechercheComponent } from '../../app/personne-recherche/personne-recherche.component';

describe('PersonneRechercheComponent', () => {
  let component: PersonneRechercheComponent;
  let fixture: ComponentFixture<PersonneRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
