import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationPartieComponent } from '../../app/configuration-jeux/configuration-jeux.component';

describe('ConfigurationPartieComponent', () => {
  let component: ConfigurationPartieComponent;
  let fixture: ComponentFixture<ConfigurationPartieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationPartieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationPartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
