import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { FormService } from '../../../shared/services/form.service';
import { LOGIN, ADMIN_DETAIL } from 'src/app/constant/urls';
import { map, catchError } from 'rxjs/operators';
import { DataTransferService } from '../../../shared/services/data-transfer.service';
import { ADMIN } from '../../../../constant/routes';
import { NgxPermissionsService } from 'ngx-permissions';
import { DASHBOARD, ADMIN_PROFILE, DRIVER, EMPLOYEES, REAL_TIME, SUBADMIN, ADMIN_NOTIFICATION } from 'src/app/constant/absolute-routes';

@Injectable()
export class LoginService {

    constructor(
        private _formBuilder: FormBuilder,
        private _http: HttpService,
        private _utilityService: UtilityService,
        private _router: Router,
        private _formService: FormService,
        private _dataTransferService: DataTransferService,
        private permissionsService: NgxPermissionsService
    ) { }

    /*
        Method For Creating Login Form
    */
    createLoginForm() {
        return this._formBuilder.group(
            {
                email: this._formService.getControl('email'),
                password: this._formService.getControl('password')
            }
        )
    }

    /*
        Method For Calling Login API
    */
    login(data) {
        data = this._utilityService.trim(data);
        data['deviceToken'] = localStorage.getItem('ai-firebase-token');
        data['deviceId'] = Math.floor(Math.random() * 1000000000).toString();
        if (!data.deviceToken) {
            delete data.deviceToken;
        }
        return this._http.post(LOGIN, data).pipe(
            map(
                response => {
                    this.loginSuccess(response.data);
                    return response;
                }
            ),
            catchError(
                err => throwError(err)
            )
        )
    }
    /*
        Method For Login
    */
    loginSuccess(data) {
        console.log(data);
        this.permissionsService.addPermission(data.adminObject.permission);
        this.permissionsService.loadPermissions(data.adminObject.permission);
        localStorage.setItem('ai-admin-token', data['accessToken']);
        localStorage.setItem('ai-admin-role', data.adminObject.type);
        localStorage.setItem('ai-admin-name', data.adminObject.name);
        localStorage.setItem('ai-admin-id', data.adminObject._id);
        localStorage.setItem('companyLocationName', data.adminObject.companyLocationName);
        localStorage.setItem('adminPermission', JSON.stringify(data.adminObject.permission));
        let building = [];
        data.adminObject.company_details.locations.forEach(element => {
            let innerData = {};
            innerData['viewValue'] = element.name;
            innerData['value'] = element.name;
            building.push(innerData)
        });
        localStorage.setItem('buildings', JSON.stringify(building));
        console.log(localStorage.getItem('buildings'));
        this._dataTransferService.profileData = data.adminObject;
        // if (data.adminObject.isProfileComplete) {
        //     this._router.navigate([`${DASHBOARD}`]);
        // }
        // else {
        //     this._router.navigate([`${ADMIN_DETAIL}`]);
        // }
        if (data.adminObject.permission.length){
            let permission = data.adminObject.permission[0];
            if(permission == "dashboard"){
                this._router.navigate([`${DASHBOARD}`]);
            }else if(permission == "entryLog"){
                this._router.navigate([`${DRIVER}`]);
            }else if(permission == "emp_vehicle"){
                this._router.navigate([`${EMPLOYEES}`]);
            }else if(permission == "realTimeDuration"){
                this._router.navigate([`${REAL_TIME}`]);
            }else if(permission == "subadmin"){
                this._router.navigate([`${SUBADMIN}`]);
            }else if(permission == "notification"){
                this._router.navigate([`${ADMIN_NOTIFICATION}`]);
            } else if(permission == "guard" || "audit"){
                this._router.navigate([`${DRIVER}`]);
            } 
        }else {
            this._router.navigate([`${DASHBOARD}`]);
        }
        

    }
}
