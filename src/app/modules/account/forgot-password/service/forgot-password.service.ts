import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
import { POPUP_MESSAGES } from '../../../../constant/messages';
import { FormService } from '../../../shared/services/form.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { Router } from '@angular/router';
import { LOGIN } from '../../../../constant/absolute-routes';
import { FORGOT_PASSWORD } from '../../../../constant/urls';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ForgotPasswordService {

    constructor(
        private _formBuilder: FormBuilder,
        private _http: HttpService,
        private _utilityService: UtilityService,
        private _router: Router,
        private _formService:FormService
    ) { }

    /* 
         Method For Creating Forgot Password Form
     */
    createForgotForm() {
        return this._formBuilder.group(
            {
                email: this._formService.getControl('email')
            }
        )
    }
    /* 
       Method For Validating Forgot Password Email
   */
    validateEmail(data) {
        data = this._utilityService.trim(data);
        return this._http.post(FORGOT_PASSWORD, data).pipe(
            map(
                response => {
                    this.emailValidationSuccess();
                    return response;
                }
            ),
            catchError(
                error => throwError(error)
            )
        )
    }
    
    /* 
       Method For Showing popup of successfully verifying and sending reset password link
   */
    emailValidationSuccess() {
        let data = {
            title: POPUP_MESSAGES.passwordResetTitle,
            message: POPUP_MESSAGES.passwordResetLink,
            yes: POPUP_MESSAGES.close,
            hideCancelButton: true
        }
        this._utilityService.openDialog(data).subscribe(success => {
            this._router.navigate([LOGIN]);
        });
    }
}
