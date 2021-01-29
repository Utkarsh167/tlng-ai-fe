import { Injectable } from '@angular/core';
import { FormService } from '../../../../shared/services/form.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../../shared/services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilityService } from '../../../../shared/services/utility.service';
import { COMMON_MESSAGES } from '../../../../../constant/messages';
import { CAB, USER_LIST,  VEHICLE_DETAIL, VENDOR, REGISTRATION_UNIQUE, CAB_BADGE_UNIQUE, VEHICLE, VEHICLE_EDIT } from '../../../../../constant/urls';
import { FileUploadService } from '../../../../shared/services/file-upload.service';

@Injectable()
export class VehicleAddService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _uitilityService: UtilityService,
    private _fileUploadService: FileUploadService
  ) { }

  createCabForm() {
    return this._formBuilder.group(
      {
        "vehicleName": this._formService.getControl('name'),
        "registrationNo": this._formService.getControl('alphaNumeric'),
        "employeeId": this._formService.getControl('alphaNumeric'),
        "searchEmp": this._formService.getControl("dropdown"),
        "type0": this._formService.getControl('name'),
        "type1": this._formService.getControl('name'),
        "type2": this._formService.getControl('name'),
        "type3": this._formService.getControl('name'),
        "type4": this._formService.getControl('name'),
        "type5": this._formService.getControl('name'),
        "type6": this._formService.getControl('name'),
        "type7": this._formService.getControl('name'),
        "type8": this._formService.getControl('name'),
        "type9": this._formService.getControl('name'),


      }
    )
  }

  addCab(data) {
    let apiType = data.cabId ? 'put' : 'post';
    return this._http[apiType](VEHICLE, data).pipe(
      map(
        response => {
          this._uitilityService.showAlert(COMMON_MESSAGES[data.cabId ? 'UPDATED' : 'ADDED']('Vehicle'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  };

  editCab(data) {
    let apiType = 'put';
    return this._http[apiType](VEHICLE_EDIT, data).pipe(
      map(
        response => {
          this._uitilityService.showAlert(COMMON_MESSAGES[data.cabId ? 'UPDATED' : 'ADDED']('Vehicle'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }

  getEmployees(data) {
    return this._http.get<Employee.List>(USER_LIST, data);
  }

  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate', 'status','shiftName']))
  }

  getCabDetail(vehicleId) {
    return this._http.get<Cab.Detail>(VEHICLE_DETAIL, { vehicleId });
  }

  // searchVendor(searchKey) {
  //   return this._http.get<Vendor.Detail[]>(VENDOR, { searchKey }, false);
  // }

  searchVendor() {
    return this._http.get<Vendor.Detail[]>(VENDOR, false);
  }

  showAlert(message) {
    this._uitilityService.showAlert(message);
  }

  uploadFiles(files) {
    return this._fileUploadService.uploadFiles(files);
  }

  checkRegistrationUnique(data: object) {
    return this._http.get<any>(REGISTRATION_UNIQUE, data, false);
  }

  checkBadgeUnique(data: object) {
    return this._http.get<any>(CAB_BADGE_UNIQUE, data, false);
  }

}
