import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import { ADMIN_DETAIL } from "src/app/constant/urls";

@Injectable({
  providedIn: "root"
})
export class DataTransferService {
  profileData;

  constructor(private _http: HttpService) {}

  getProfileDetail() {
    return new Observable(observer => {
      if (this.profileData) {
        observer.next(this.profileData);
      } else {
        this._http.get<any>(ADMIN_DETAIL).subscribe(
          response => {
            if (response["statusCode"] === 200) {
              this.profileData = response;
              observer.next(response);
            } else {
              observer.next(null);
            }
          },
          error => {
            observer.next(null);
          }
        );
      }
    });
  }

  getProfileDetailForLive() {
    return new Observable(observer => {
      this._http.get<any>(ADMIN_DETAIL).subscribe(
        response => {
          if (response["statusCode"] === 200) {
            observer.next(response.data.companyBranch.coordinates);
          } else {
            observer.next(null);
          }
        },
        error => {
          observer.next(null);
        }
      );
    });
  }
}
