import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquePartieComponent } from '../../app/historique-partie/historique-partie.component';

describe('HistoriquePartieComponent', () => {
  let component: HistoriquePartieComponent;
  let fixture: ComponentFixture<HistoriquePartieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriquePartieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriquePartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
