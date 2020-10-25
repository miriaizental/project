import { TestBed } from '@angular/core/testing';

import { VolunteeringserviceService } from './volunteeringservice.service';

describe('VolunteeringserviceService', () => {
  let service: VolunteeringserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteeringserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
