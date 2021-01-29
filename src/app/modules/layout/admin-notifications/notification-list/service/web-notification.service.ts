import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { WEB_NOTI_LIST, DELETE_NOTI, SEND_NOTI } from 'src/app/constant/urls';
import { COMMON_MESSAGES } from 'src/app/constant/messages';

@Injectable({
  providedIn: 'root'
})
export class WebNotificationService {

  constructor(private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _uitilityService: UtilityService) { }

  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Registration Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate
      },
      scheduleDate: {
        label: 'Scheduled Date',
        scheduleFromDate: form.controls.scheduleFromDate,
        scheduleToDate: form.controls.scheduleToDate
      }
    }
  }

  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate', 'scheduleFromDate', 'scheduleToDate']))
  }

  getAllNoti(data) {
    return this._http.get<any>(WEB_NOTI_LIST, data);
  }

  async changeStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Notification')
      }
      let success = await this._uitilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          this._http.delete(DELETE_NOTI + body.userId).toPromise() :
          this._http.post(SEND_NOTI + body.userId, { status: body.status }).toPromise();
        await response;
        this._uitilityService.showAlert(COMMON_MESSAGES[status].success('Notification'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }

}
