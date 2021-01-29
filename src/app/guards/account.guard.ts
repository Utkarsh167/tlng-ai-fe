import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route,
  CanLoad, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { POPUP_MESSAGES } from '../constant/messages';
import { UtilityService } from '../modules/shared/services/utility.service';
import { HttpService } from '../modules/shared/services/http.service';
import { LINK_EXPIRED, ADMIN } from '../constant/routes';
import { VALIDATE_TOKEN } from '../constant/urls';

@Injectable()
export class AccountGuard implements CanActivate, CanLoad {
  constructor(
    private _router: Router,
    private _utilityService: UtilityService,
    private _http: HttpService
  ) {

  }

  navigate() {
    this._router.navigate([`/${ADMIN}`]);
    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._utilityService.getAuthToken()) {

      let token = next.params.token;
      if (token) {
        return this.validateResetPasswordToken(token);
      }
      else {
        return true;
      }

    }

    return this.navigate();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._utilityService.getAuthToken()) {
      return true;
    }
    return this.navigate();

  }

  validateResetPasswordToken(token) {
    return new Observable<boolean>((observer) => {

      this._http.get(VALIDATE_TOKEN, { accessToken: token }).subscribe(
        response => {
          if (response['statusCode'] === 200) {
            observer.next(true); 
          } else {
            this._utilityService.showAlert(POPUP_MESSAGES.invalidResetPasswordLink);
            this._router.navigate([`/${LINK_EXPIRED}`]);
            observer.next(false);
          }
        }, err => {
          this._utilityService.showAlert(POPUP_MESSAGES.invalidResetPasswordLink);
          this._router.navigate([`/${LINK_EXPIRED}`]);
          observer.next(false);
        }
      )
    });
  }
}
