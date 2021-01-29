/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubAdminDetailService } from './sub-admin-detail.service';

describe('Service: SubAdminDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubAdminDetailService]
    });
  });

  it('should ...', inject([SubAdminDetailService], (service: SubAdminDetailService) => {
    expect(service).toBeTruthy();
  }));
});
