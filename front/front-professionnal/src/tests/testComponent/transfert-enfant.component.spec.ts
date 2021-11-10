import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertEnfantComponent } from '../../app/transfert-enfant/transfert-enfant.component';

describe('TransfertEnfantComponent', () => {
  let component: TransfertEnfantComponent;
  let fixture: ComponentFixture<TransfertEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
