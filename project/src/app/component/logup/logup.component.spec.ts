import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogupComponent } from './logup.component';

describe('LogupComponent', () => {
  let component: LogupComponent;
  let fixture: ComponentFixture<LogupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LogupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
