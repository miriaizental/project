import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreatenewcallComponent } from './createnewcall.component';

describe('CreatenewcallComponent', () => {
  let component: CreatenewcallComponent;
  let fixture: ComponentFixture<CreatenewcallComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatenewcallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenewcallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
