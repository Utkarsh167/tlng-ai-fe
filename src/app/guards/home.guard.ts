import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilityService } from '../modules/shared/services/utility.service';
import { LOGIN } from '../constant/absolute-routes';
import { ProfileService } from '../modules/profile/profile-detail/service/profile.service';
import { LoaderService } from '../modules/shared/services/loader.service';
import { POPUP_MESSAGES } from '../constant/messages';
import { ADMIN_DETAIL } from '../constant/urls';

@Injectable()
export class HomeGuard implements CanActivate, CanLoad {
  constructor(
    private _router: Router,
    private _utilityService: UtilityService,
    private _profileService: ProfileService,
    private _loaderService: LoaderService
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkProfileStatus(next);
  }

  checkProfileStatus(next): Observable<boolean> | boolean {
    if (this._utilityService.getAuthToken()) {
      if (next.data && next.data.defaultAccess) {
        return true
      }
      return new Observable<boolean>((observer) => {
        this._profileService.getProfileDetails().subscribe(
          res => {
            // if (res.data.isProfileComplete) {
            //   observer.next(true);
            //   observer.complete();
            // } else {
            //   this._loaderService.loader.next(false)
            //   this.openPopup().subscribe(
            //     data => {
            //       observer.next(false);
            //       observer.complete();
            //       this._router.navigate([ADMIN_DETAIL]);
            //     }
            //   )

            // }
            observer.next(true);
            observer.complete();
          },
          err => {
            observer.next(false);
            observer.complete();
          }
        )
      })
    } else {
      return this.navigate();
    }
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkProfileStatus(route);
  }

  openPopup() {
    let data = {
      title: POPUP_MESSAGES.completeProfile,
      message: POPUP_MESSAGES.profileComplete,
      yes: POPUP_MESSAGES.close,
      hideCancelButton: true
    }
    return this._utilityService.openDialog(data);
  }

  navigate() {
    this._utilityService.clearStorage();
    this._router.navigate([LOGIN]);
    return false;
  }
}
