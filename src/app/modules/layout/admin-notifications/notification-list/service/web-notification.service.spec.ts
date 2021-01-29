/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebNotificationService } from './web-notification.service';

describe('Service: WebNotification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebNotificationService]
    });
  });

  it('should ...', inject([WebNotificationService], (service: WebNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
