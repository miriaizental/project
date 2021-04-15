import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AskforhelpComponent } from './askforhelp.component';

describe('AskforhelpComponent', () => {
  let component: AskforhelpComponent;
  let fixture: ComponentFixture<AskforhelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AskforhelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskforhelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
