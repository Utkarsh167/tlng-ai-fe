import { TestBed } from '@angular/core/testing';

import { SubAdminArchiveService } from './sub-admin-archive.service';

describe('SubAdminArchiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubAdminArchiveService = TestBed.get(SubAdminArchiveService);
    expect(service).toBeTruthy();
  });
});
