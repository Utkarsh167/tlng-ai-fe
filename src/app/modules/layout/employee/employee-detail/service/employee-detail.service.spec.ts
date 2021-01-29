import { TestBed } from '@angular/core/testing';

import { EmployeeDetailService } from './employee-detail.service';

describe('EmployeeDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeDetailService = TestBed.get(EmployeeDetailService);
    expect(service).toBeTruthy();
  });
});
