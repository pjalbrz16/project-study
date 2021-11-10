import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltresGestionComponent } from '../../app/filtres-gestion/filtres-gestion.component';

describe('FiltresGestionComponent', () => {
  let component: FiltresGestionComponent;
  let fixture: ComponentFixture<FiltresGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltresGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltresGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
