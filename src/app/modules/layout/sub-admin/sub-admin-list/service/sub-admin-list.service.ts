import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { SUBADMIN_LIST, BLOCK_SUBADMIN, DELETE_SUBADMIN } from 'src/app/constant/urls';
import { COMMON_MESSAGES } from 'src/app/constant/messages';

@Injectable({
  providedIn: 'root'
})
export class SubAdminListService {

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
      status: {
        label: 'Status',
        list: [
          { viewValue: 'Active', value: 'unblocked' },
          { viewValue: 'Blocked', value: 'blocked' }
        ],
        control: form.controls.status
      },
      // complocation -- satyam
      compLocationName: {
        label: 'Building',
        list: JSON.parse(localStorage.getItem('buildings')),
        control: form.controls.compLocationName
      },
    }
  }

  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate', 'status', 'compLocationName']))
  }

  getAllSubadmin(data) {
    return this._http.get<any>(SUBADMIN_LIST, data);
  }

  async changeStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Sub Admin')
      }
      let success = await this._uitilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          await this._http.delete(DELETE_SUBADMIN + body.userId).toPromise() :
          await this._http.post(BLOCK_SUBADMIN + body.userId, { status: body.status }).toPromise();
        response;
        this._uitilityService.showAlert(COMMON_MESSAGES[status].success('Sub Admin'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }
}
