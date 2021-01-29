/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubAdminAddService } from './sub-admin-add.service';

describe('Service: SubAdminAdd', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubAdminAddService]
    });
  });

  it('should ...', inject([SubAdminAddService], (service: SubAdminAddService) => {
    expect(service).toBeTruthy();
  }));
});
