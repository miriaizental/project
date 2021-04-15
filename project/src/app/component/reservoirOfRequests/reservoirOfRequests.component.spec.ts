import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { reservoirOfRequestsComponent } from './reservoirOfRequests.component';

describe('AskforhelpComponent', () => {
  let component: reservoirOfRequestsComponent;
  let fixture: ComponentFixture<reservoirOfRequestsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ reservoirOfRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(reservoirOfRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
