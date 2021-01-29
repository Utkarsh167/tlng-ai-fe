import { TestBed } from '@angular/core/testing';

import { EmployeeAddService } from './employee-add.service';

describe('EmployeeAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeAddService = TestBed.get(EmployeeAddService);
    expect(service).toBeTruthy();
  });
});
