import { Component, OnInit } from '@angular/core';
import { POPUP_MESSAGES, SOMETHING_WENT_WRONG } from '../../../../constant/messages';
import { UtilityService } from '../../../shared/services/utility.service';
import { HttpService } from '../../../shared/services/http.service';
import { Router, NavigationEnd } from '@angular/router';
import { LOGOUT } from '../../../../constant/urls';
// Added FORGOT_PASSWORD - Shivakumar A
import { LOGIN, FORGOT_PASSWORD } from '../../../../constant/absolute-routes';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ProfileService } from 'src/app/modules/profile/profile-detail/service/profile.service';
// ImportRequestListService, Pagination - Shivakumar A
import { Pagination } from "src/app/models/pagination";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
// Extend Pagination to class - Shivakumar A
export class HeaderComponent extends Pagination implements OnInit {

  adminName: string;
  adminRole: string;
  // TotalPendingData, TotalPendingCount - Shivakumar A
  TotalPendingData: any;
  TotalPendingCount: number;
  // timer -- satyam
  Date: string;

  

  constructor(
    private _utilityService: UtilityService,
    private _http: HttpService,
    private _router: Router,
  ) {
    // Call super for derived class (Pagination) - Shivakumar A
    super();
    // Check for requests on every route change - Shivakumar A
    // this._router.events.subscribe((ev) => {
    //   if (ev instanceof NavigationEnd) {
    //     // if route not equal to /account/login call function getTotalrequestsCount() - Shivakumar A
    //     if (ev.url !== LOGIN) {
    //       this.getTotalrequestsCount(ev.url);
    //     }
    //   }
    // });
  }

  ngOnInit() {
    this.adminName = localStorage.getItem('ai-admin-name');
    this.adminRole = localStorage.getItem('ai-admin-role');
    // timer -- satyam
    let currentDate = new Date();
    this.Date = currentDate.toLocaleDateString()+ ' ' + currentDate.toLocaleTimeString();
    setInterval(()=>{
      currentDate = new Date();
      this.Date = currentDate.toLocaleDateString()+ ' ' + currentDate.getHours()+ ':' +currentDate.getMinutes();
    },1000)
    // check for data change in Count every X seconds - Shivakumar A
    // setInterval(()=>{
    //   this.TotalPendingCount = parseInt(localStorage.getItem('COUNT'));
    // },1000)
    
    
  }

  

  

  logout() {
    let data = {
      title: POPUP_MESSAGES.logout,
      message: POPUP_MESSAGES.logoutConfirmation,
      yes: POPUP_MESSAGES.logout
    }
    this._utilityService.openDialog(data).subscribe(success => {
      if (success) {
        this._http.post(LOGOUT, {})
          .pipe(
            tap(
              response => {
                if (response['statusCode'] === 200) {
                  this._utilityService.clearStorage();
                  location.reload();
                  ProfileService.profileData = null;
                  setTimeout(()=> {
                    this._router.navigate([LOGIN]);
                  }, 500);
                  
                }
              }
            ),
            catchError(
              err => {
                this._utilityService.showAlert(SOMETHING_WENT_WRONG, 'error');
                return throwError(err);
              }
            )
          ).subscribe();
      }

    });

  }

}
