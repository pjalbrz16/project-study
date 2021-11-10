import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixHabitudeComponent } from '../../app/choix-habitude/choix-habitude.component';

describe('ChoixHabitudeComponent', () => {
  let component: ChoixHabitudeComponent;
  let fixture: ComponentFixture<ChoixHabitudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixHabitudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixHabitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
