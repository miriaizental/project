import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteersignupComponent } from './volunteersignup.component';

describe('VolunteersignupComponent', () => {
  let component: VolunteersignupComponent;
  let fixture: ComponentFixture<VolunteersignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteersignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
