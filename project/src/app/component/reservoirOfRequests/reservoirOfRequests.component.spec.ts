import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { reservoirOfRequestsComponent } from './reservoirOfRequests.component';

describe('AskforhelpComponent', () => {
  let component: reservoirOfRequestsComponent;
  let fixture: ComponentFixture<reservoirOfRequestsComponent>;

  beforeEach(async(() => {
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
