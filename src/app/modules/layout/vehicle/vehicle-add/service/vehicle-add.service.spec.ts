import { TestBed } from '@angular/core/testing';

import { VehicleAddService } from './vehicle-add.service';

describe('VehicleAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleAddService = TestBed.get(VehicleAddService);
    expect(service).toBeTruthy();
  });
});
