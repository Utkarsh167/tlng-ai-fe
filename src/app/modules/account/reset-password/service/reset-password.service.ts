import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
import { POPUP_MESSAGES } from '../../../../constant/messages';
import { UtilityService } from '../../../shared/services/utility.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { LOGIN } from '../../../../constant/absolute-routes';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { map, catchError } from 'rxjs/operators';
import { RESET_PASSWORD } from '../../../../constant/urls';
import { LINK_EXPIRED } from 'src/app/constant/routes';

@Injectable()
export class ResetPasswordService {

    constructor(
        private _formBuilder: FormBuilder,
        private _http: HttpService,
        private _utilityService: UtilityService,
        private _router: Router,
        private _formService: FormService
    ) { }

    /* 
        Method For Creating Registration Form
    */
    createResetPasswordForm() {
        return this._formBuilder.group(
            {
                password: this._formService.getControl('password'),
                confirmPassword: this._formService.getControl('password')
            },
            {
                // validator: this._formService.matchPassword
            }
        ) 
    }

    /* 
        Method For Resetting The Password
    */
    resetPassword(data) {
        data = this._utilityService.trim(data);
        return this._http.post(`${RESET_PASSWORD}?accessToken=${data.token}`, { password: data.password }).pipe(
            map(
                response => {
                    this.resetPasswordSuccess();
                    return response;
                }
            ),
            catchError(
                error => {
                    if (error.error.statusCode === 400 && error.error.responseType === 'INVALID_TOKEN') {
                        this._router.navigate([`/${LINK_EXPIRED}`]);
                    }
                    return throwError(error);
                }
            )
        )
    }

    /* 
       Method For Showing Reset Password Success
   */
    resetPasswordSuccess() {
        let data = {
            title: POPUP_MESSAGES.passwordResetTitle,
            message: POPUP_MESSAGES.passwordChanged,
            yes: POPUP_MESSAGES.close,
            hideCancelButton: true
        }
        this._utilityService.openDialog(data).subscribe(success => {
            if (this._router.url.startsWith('/account'))
            this._router.navigate([LOGIN]);
        });
    }
}
