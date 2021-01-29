/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubAdminListService } from './sub-admin-list.service';

describe('Service: SubAdminList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubAdminListService]
    });
  });

  it('should ...', inject([SubAdminListService], (service: SubAdminListService) => {
    expect(service).toBeTruthy();
  }));
});
