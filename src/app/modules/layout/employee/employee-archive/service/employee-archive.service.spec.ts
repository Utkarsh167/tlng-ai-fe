import { TestBed } from '@angular/core/testing';

import { EmployeeArchiveService } from './employee-archive.service';

describe('EmployeeArchiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeArchiveService = TestBed.get(EmployeeArchiveService);
    expect(service).toBeTruthy();
  });
});
