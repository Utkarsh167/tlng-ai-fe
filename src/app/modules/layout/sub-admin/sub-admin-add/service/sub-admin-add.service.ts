import { Injectable } from '@angular/core';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { ADD_SUBADMIN, GET_PERMISSION, DETAILS_SUBADMIN, GET_LOCATIONS } from 'src/app/constant/urls';
import { COMMON_MESSAGES } from 'src/app/constant/messages';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubAdminAddService {

  constructor(private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _uitilityService: UtilityService) {

  }


  createSubadminForm() {
    return this._formBuilder.group(
      {
        "name": this._formService.getControl('name'),
        "email": this._formService.getControl('email'),
        "permission": "",
        "companyLocationName": this._formService.getControl('dropdown')
      }
    )
  }

  getAllPermission() {
    return this._http.get<any>(GET_PERMISSION);
  }

  getSubAdminDetails(userId) {
    return this._http.get<any>(DETAILS_SUBADMIN+userId);
  }


  addSubadmin(data) {
    let apiType = data.userId ? 'put' : 'post';
    return this._http[apiType](ADD_SUBADMIN, data).pipe(
      map(
        response => {
          this._uitilityService.showAlert(COMMON_MESSAGES[data.userId ? 'UPDATED' : 'ADDED']('Subadmin'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }


  getLocations() {
    return this._http.get<any>(GET_LOCATIONS);
  }
}
