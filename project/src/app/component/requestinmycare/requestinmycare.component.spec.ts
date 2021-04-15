import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RequestinmycareComponent } from './requestinmycare.component';

describe('RequestinmycareComponent', () => {
  let component: RequestinmycareComponent;
  let fixture: ComponentFixture<RequestinmycareComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestinmycareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestinmycareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
