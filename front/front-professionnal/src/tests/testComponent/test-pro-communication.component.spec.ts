import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProCommunicationComponent } from '../../app/test-pro-communication/test-pro-communication.component';

describe('TestProCommunicationComponent', () => {
  let component: TestProCommunicationComponent;
  let fixture: ComponentFixture<TestProCommunicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestProCommunicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestProCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
