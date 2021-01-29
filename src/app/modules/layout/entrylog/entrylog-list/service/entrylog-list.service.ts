import { Injectable } from '@angular/core';
import { FormService } from '../../../../shared/services/form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../../shared/services/http.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { USER_LIST, ENTRYLOG_MANUAL_ENTRY, BLOCK_USER, USER, DRIVER_BULKUPLOAD, ENTRYLOG_LIST, GET_LOCATIONS } from '../../../../../constant/urls';
import { COMMON_MESSAGES } from '../../../../../constant/messages';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class EntryLogListService {

  buildings: any;
  locationsData = [];
  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getFilterForm() {
    return this._formBuilder.group(
      // compLocationName - satyam
      this._formService.getFilterFormControls(['fromDate', 'toDate', 'userType', 'requestedPage', 'status', 'compLocationName']))
  }

  createModalForm() {
    return this._formBuilder.group(
      {
        "employeeId": this._formService.getControl('alphaNumeric'),
        "vehicleType": this._formService.getControl('dropdown'),
        "name": this._formService.getControl('name'),
        "mobile": this._formService.getControl('phoneManual'),
        "guestValidity": this._formService.getControl('date'),
        "reason": this._formService.getControl('name'),
        "regNo": this._formService.getControl('alphaNumeric'),
        "modal": this._formService.getControl('name'),
      }
    )
  }


  getDrivers(data) {
    return this._http.get<any>(ENTRYLOG_LIST, data);
  }

  getPermission() {
    return localStorage.getItem("adminPermission");
  }

  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Registration Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate
      },
      userType: {
        label: 'User Type',
        list: [
          { viewValue: 'Guest', value: 1 },
          { viewValue: 'Employee', value: 2 }
        ],
        control: form.controls.userType
      },
      requestedPage: {
        label: 'Entry Type',
        list: [
          { viewValue: 'Automatic', value: 'automatic' },
          { viewValue: 'Manual', value: 'manual' }
        ],
        control: form.controls.requestedPage
      },
      status: {
        label: 'Status',
        list: [
          { viewValue: 'Blacklisted', value: "blocked" },
          { viewValue: 'Whitelisted', value: "unblocked" }
        ],
        control: form.controls.status
      },
      // compLocation -- satyam
      compLocationName: {
        label: 'Building',
        list: JSON.parse(localStorage.getItem('buildings')),
        control: form.controls.compLocationName
      },
    }
  }

  openDailog() {

  }

  async changeStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Driver')
      }
      let success = await this._utilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          this._http.delete(USER + body.userId).toPromise() :
          this._http.post(BLOCK_USER + body.userId, { status: body.status }).toPromise();
        await response;
        this._utilityService.showAlert(COMMON_MESSAGES[status].success('Driver'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }

  uploadFile(data) {
    var formData = new FormData();
    formData.append('file', data);
    let apiType = 'post';
    return this._http[apiType](DRIVER_BULKUPLOAD, formData).pipe(
      map(
        response => {
          this._utilityService.showAlert(COMMON_MESSAGES['UPLOADED']('File'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }

  getLocations() {
    this.locationsData = [];
    return this._http.get<any>(GET_LOCATIONS).subscribe(res => {
      this.buildings = res.data.locations;

      this.buildings.forEach(element => {
        this.locationsData.push({ viewValue: element.name, value: element.name });
      });
    })
  }

  addManualEntry(data) {
    return this._http.post<any>(ENTRYLOG_MANUAL_ENTRY, data);
  }

  getEmployees(data) {
    return this._http.get<Employee.List>(USER_LIST, data);
  }
}
