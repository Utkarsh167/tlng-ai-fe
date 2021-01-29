import { Injectable } from "@angular/core";
import { FormService } from "../../../../shared/services/form.service";
import { FormBuilder } from "@angular/forms";
import { HttpService } from "../../../../shared/services/http.service";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { UtilityService } from "../../../../shared/services/utility.service";
import { COMMON_MESSAGES, CAB_ASSIGNED } from "../../../../../constant/messages";
import {
  ADD_EMPLOYEE,
  USER_DETAIL,
  COMPANY_SHIFT,
  CHECK_EMPLOYEE_NUMBER_UNIQUE,
  EDIT_EMPLOYEE,
  BLOCK_VEHICLE, CAB, LOCATION_NAMES 
} from "../../../../../constant/urls";

@Injectable()
export class EmployeeAddService {
  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _uitilityService: UtilityService
  ) {}

  createEmployeeForm() {
    return this._formBuilder.group({
      name: this._formService.getControl("name"),
      email: this._formService.getControl("email"),
      mobileNo: this._formService.getControl("phone"),
      employeeId: this._formService.getControl("id"),
      gender: this._formService.getControl("name"),
      companyLocationName:  this._formService.getControl("dropdown"),
      vehicleName: this._formService.getControl("name"),
      vehicleName0: this._formService.getControl("name"),
      vehicleName1: this._formService.getControl("name"),
      vehicleName2: this._formService.getControl("name"),
      vehicleName3: this._formService.getControl("name"),
      vehicleName4: this._formService.getControl("name"),
      vehicleName5: this._formService.getControl("name"),
      vehicleName6: this._formService.getControl("name"),
      vehicleName7: this._formService.getControl("name"),
      vehicleName8: this._formService.getControl("name"),
      vehicleName9: this._formService.getControl("name"),


      registrationNo: this._formService.getControl("regNo"),
      registrationNo0: this._formService.getControl("regNo"),
      registrationNo1: this._formService.getControl("regNo"),
      registrationNo2: this._formService.getControl("regNo"),
      registrationNo3: this._formService.getControl("regNo"),
      registrationNo4: this._formService.getControl("regNo"),
      registrationNo5: this._formService.getControl("regNo"),
      registrationNo6: this._formService.getControl("regNo"),
      registrationNo7: this._formService.getControl("regNo"),
      registrationNo8: this._formService.getControl("regNo"),
      registrationNo9: this._formService.getControl("regNo"),

      type0: this._formService.getControl("dropdown"),
      type1: this._formService.getControl("dropdown"),
      type2: this._formService.getControl("dropdown"),
      type3: this._formService.getControl("dropdown"),
      type4: this._formService.getControl("dropdown"),
      type5: this._formService.getControl("dropdown"),
      type6: this._formService.getControl("dropdown"),
      type7: this._formService.getControl("dropdown"),
      type8: this._formService.getControl("dropdown"),
      type9: this._formService.getControl("dropdown"),


    });
  }

  addEmployee(data) {
    let apiType = data.empId ? "put" : "post";
    return this._http[apiType](ADD_EMPLOYEE, data).pipe(
      map(response => {
        this._uitilityService.showAlert(
          COMMON_MESSAGES[data.empId ? "UPDATED" : "ADDED"]("Employee")
        );
        return response;
      }),
      catchError(error => throwError(error))
    );
  }

  editEmployee(data) {
    let apiType = "put";
    return this._http[apiType](EDIT_EMPLOYEE, data).pipe(
      map(response => {
        this._uitilityService.showAlert(
          COMMON_MESSAGES[data.empId ? "UPDATED" : "ADDED"]("Employee")
        );
        return response;
      }),
      catchError(error => throwError(error))
    );
  }

  getEmployeeDetail(userId) {
    return this._http.get<any>(USER_DETAIL, { userId });
  }

  checkEmployeeNoUnique(data: object) {
    return this._http.get<any>(CHECK_EMPLOYEE_NUMBER_UNIQUE, data, false);
  }

  getAllLocations() {
    return this._http.get<any>(LOCATION_NAMES);
  }

  async changeStatus(body, isAssigned) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: `${isAssigned && body.status !== 'unblocked' ? CAB_ASSIGNED : ''}${COMMON_MESSAGES[status].confirm('Vehicle')}`
      }
      let success = await this._uitilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          this._http.delete(`${CAB}/${body.cabId}`).toPromise() :
          this._http.post(BLOCK_VEHICLE + body.cabId, { status: body.status }).toPromise();
        await response;
        this._uitilityService.showAlert(COMMON_MESSAGES[status].success('Vehicle'))
        return Promise.resolve(response);
      } else {
        return Promise.reject();
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }
}
