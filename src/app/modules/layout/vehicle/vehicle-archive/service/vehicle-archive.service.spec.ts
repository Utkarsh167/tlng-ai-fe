import { TestBed } from '@angular/core/testing';

import { VehicleArchiveService } from './vehicle-archive.service';

describe('VehicleArchiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleArchiveService = TestBed.get(VehicleArchiveService);
    expect(service).toBeTruthy();
  });
});
