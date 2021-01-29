import { TestBed } from '@angular/core/testing';

import { EntryLogAddService } from './entrylog-add.service';

describe('EntryLogAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntryLogAddService = TestBed.get(EntryLogAddService);
    expect(service).toBeTruthy();
  });
});
