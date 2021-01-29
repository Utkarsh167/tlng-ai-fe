/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationAddService } from './notification-add.service';

describe('Service: NotificationAdd', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationAddService]
    });
  });

  it('should ...', inject([NotificationAddService], (service: NotificationAddService) => {
    expect(service).toBeTruthy();
  }));
});
