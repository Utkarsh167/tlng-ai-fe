import { Injectable } from '@angular/core';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { ADD_NOTIFICATION, NOTI_DETAILS } from 'src/app/constant/urls';
import { COMMON_MESSAGES } from 'src/app/constant/messages';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationAddService {

  constructor(private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _uitilityService: UtilityService) {

  }

  createNotificationForm() {
    return this._formBuilder.group(
      {
        "title": this._formService.getControl('alphaNumeric'),
        "audience": this._formService.getControl('dropdown'),
        "message": this._formService.getControl('description'),
        "scheduleType": this._formService.getControl('dropdown'),
        "scheduleTime": "",
      }
    )
  }

  addNoti(data) {
    let apiType = data.notificationId ? 'put' : 'post';
    return this._http[apiType](ADD_NOTIFICATION, data).pipe(
      map(
        response => {
          this._uitilityService.showAlert(COMMON_MESSAGES[data.notificationId ? 'UPDATED' : 'ADDED']('Notification'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }

  getNotiDetail(notificationId) {
    return this._http.get<any>(NOTI_DETAILS, { notificationId });
  }

}
