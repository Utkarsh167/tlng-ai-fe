import { TestBed } from '@angular/core/testing';

import { EntryLogListService } from './entrylog-list.service';

describe('EntryLogListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntryLogListService = TestBed.get(EntryLogListService);
    expect(service).toBeTruthy();
  });
});
