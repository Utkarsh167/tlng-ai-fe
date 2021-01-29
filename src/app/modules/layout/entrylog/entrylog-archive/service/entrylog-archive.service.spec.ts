import { TestBed } from '@angular/core/testing';

import { EntryLogArchiveService } from './entrylog-archive.service';

describe('EntryLogArchiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntryLogArchiveService = TestBed.get(EntryLogArchiveService);
    expect(service).toBeTruthy();
  });
});
