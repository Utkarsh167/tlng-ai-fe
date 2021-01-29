import { TestBed } from '@angular/core/testing';

import { EntryLogDetailService } from './entrylog-detail.service';

describe('EntryLogDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntryLogDetailService = TestBed.get(EntryLogDetailService);
    expect(service).toBeTruthy();
  });
});
