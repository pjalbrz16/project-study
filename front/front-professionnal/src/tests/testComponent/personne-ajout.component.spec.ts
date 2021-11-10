import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneAjoutComponent } from '../../app/personne-ajout/personne-ajout.component';

describe('PersonneAjoutComponent', () => {
  let component: PersonneAjoutComponent;
  let fixture: ComponentFixture<PersonneAjoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneAjoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
