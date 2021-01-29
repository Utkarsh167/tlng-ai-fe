import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilityService } from '../../shared/services/utility.service';
import { HttpService } from '../../shared/services/http.service';
import { FormService } from '../../shared/services/form.service';
import { POPUP_MESSAGES } from 'src/app/constant/messages';
import { CHANGE_PASSWORD } from 'src/app/constant/urls';
import { DASHBOARD } from 'src/app/constant/absolute-routes';

@Injectable()
export class ChangePasswordService {
  constructor(
    private _utilityService: UtilityService,
    private _http: HttpService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _formService: FormService
  ) {
  }

  /**
   * @description Making Change Password Form
   */
  getChangePasswordForm() {
    return this._formBuilder.group(
      {
        oldPassword: this._formService.getControl('password'),
        password: this._formService.getControl('password'),
        confirmPassword: this._formService.getControl('password')
      },
      {
        // validator: this._formService.matchPassword
      }
    );
  }

  /**
   * @description Changing Password , After that Redirect To Setting Page
   * @param data 
   */
  changePassword(data) {
    return this._http.post(CHANGE_PASSWORD, data).pipe(
      map(
        response => {
          if (response['statusCode'] === 200) {
            this._utilityService.showAlert(POPUP_MESSAGES['passwordChanged']);
            this._router.navigate([DASHBOARD]);
          }
        }
      ),
      catchError(
        error => {
          return throwError(error);
        }
      )
    )
  }
} 