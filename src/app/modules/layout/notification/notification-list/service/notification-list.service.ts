import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { GET_ALL_NOTI_LIST } from '../../../../../constant/urls';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationListService {

  constructor(private _http: HttpService,
    private _utilityService: UtilityService,
    private _formBuilder: FormBuilder,
    private _formService: FormService) { }

  getNotifications(data) {
    return this._http.get<Notifications.Data>(GET_ALL_NOTI_LIST, data);
  }

  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Registration Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate
      },
    }
  }

  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate']))
  }

}
