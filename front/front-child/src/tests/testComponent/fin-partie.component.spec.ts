import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinPartieComponent } from '../../app/fin-partie/fin-partie.component';

describe('FinPartieComponent', () => {
  let component: FinPartieComponent;
  let fixture: ComponentFixture<FinPartieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinPartieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinPartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
